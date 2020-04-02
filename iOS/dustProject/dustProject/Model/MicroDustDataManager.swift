//
//  MicroDustDataManager.swift
//  dustProject
//
//  Created by Keunna Lee on 2020/03/31.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import Foundation

class MicroDustDataManager{
//        let microDustURL = "http://ec2-15-164-254-158.ap-northeast-2.compute.amazonaws.com:8080/%EA%B0%95%EB%82%A8%EA%B5%AC/daily-dust-status"
    let microDustURL = "http://192.168.1.245:8080/mock/%EA%B0%95%EB%82%A8%EA%B5%AC/daily-dust-status"
    
    static let MicroDustDecodedNotification = NSNotification.Name("MicroDustDecodedNotification")
    
    private(set) var microDustInfo: [MicroDustInfo]?
    
    init() {
        decodeJson()
    }
    
    func microDustInfoCount() -> Int?{
        return microDustInfo?.count
    }
    
    func giveFigureData(for index: Int) -> String {
        guard let microDustInfo = microDustInfo?[index] else { return ""}
        return microDustInfo.pm10Value
    }
    
    func giveGradeData(for index: Int) -> String {
        guard let microDustInfo = microDustInfo?[index] else {return "" }
        return microDustInfo.pm10Grade1h
    }
    
    func giveDateTImeData(for index: Int) -> String {
        guard let microDustInfo = microDustInfo?[index] else {return "" }
        return microDustInfo.dateTime
    }
    
    private func decodeJson() {
        guard let url = URL(string: microDustURL) else { return }
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            guard error == nil else { self.microDustInfo = nil; return }
            guard let data = data else { self.microDustInfo = nil; return }
            let decoder = JSONDecoder()
            do{
                self.microDustInfo = try decoder.decode([MicroDustInfo].self, from: data)
                NotificationCenter.default.post(name: MicroDustDataManager.MicroDustDecodedNotification, object: nil)
            } catch {
                self.microDustInfo = nil
            }
        }.resume()
    }
}
