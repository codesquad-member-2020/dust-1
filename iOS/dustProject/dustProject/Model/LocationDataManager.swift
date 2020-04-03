//
//  LocationDataManager.swift
//  dustProject
//
//  Created by Keunna Lee on 2020/04/03.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import Foundation

class LocationDataManager {
    private(set) var locationInfo: LocationInfo?

    func requestLocation(latitude: Double, longitude: Double) {
            let locationURL = "http://ec2-15-164-254-158.ap-northeast-2.compute.amazonaws.com:8080/location/@=\(latitude),\(longitude)"
        guard let url = URL(string: locationURL) else { return }
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            guard error == nil else { self.locationInfo = nil; print(error); return }
            guard let data = data else { self.locationInfo = nil; print("data is nil"); return }
            let decoder = JSONDecoder()
            do{
                self.locationInfo = try decoder.decode(LocationInfo.self, from: data)
            } catch {
                self.locationInfo = nil
            }
        }.resume()

    }
    
    func giveStationName() -> String {
        return self.locationInfo?.stationName ?? ""
    }

}
