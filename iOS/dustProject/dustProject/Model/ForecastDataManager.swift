//
//  ForecastDataManager.swift
//  dustProject
//
//  Created by Keunna Lee on 2020/04/03.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import Foundation

class ForecastDataManager{
    
    private let requestForecastURL = "http://ec2-15-164-254-158.ap-northeast-2.compute.amazonaws.com:8080/forecast"
    private(set) var atmosphericImageInfo: AtmosphericImageInfo?
    
    init() {
        decodeMicroDustImageJson()
    }

    func decodeMicroDustImageJson() {
        guard let url = URL(string: requestForecastURL) else { return }
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            guard error == nil else { self.atmosphericImageInfo = nil; print("error"); return }
            guard let data = data else { self.atmosphericImageInfo = nil; print("data is nil"); return }
            let decoder = JSONDecoder()
            do{
                self.atmosphericImageInfo = try decoder.decode(AtmosphericImageInfo.self, from: data)
            } catch {
                self.atmosphericImageInfo = nil
            }
        }.resume()
    }
    
    func giveMicroDustImage() -> [ImageInfo]? {
        return self.atmosphericImageInfo?.images
    }
    
    func giveInformOverall() -> String {
        return self.atmosphericImageInfo?.informOverall ?? ""
    }
    
    func giveInformGrade() -> String {
        return self.atmosphericImageInfo?.informGrade ?? ""
    }
}
