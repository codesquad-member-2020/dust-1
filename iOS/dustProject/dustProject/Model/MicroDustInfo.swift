//
//  MicroDustInfo.swift
//  dustProject
//
//  Created by Keunna Lee on 2020/03/31.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import Foundation

enum Grade : String {
    case Great = "1", Nomal = "2",Bad = "3",Terrible = "4",None = "0"
    
    func showGrade(gradeData: String) -> Grade {
        switch gradeData {
        case "1": return .Great
        case "2": return .Nomal
        case "3": return .Bad
        case "4": return .Terrible
        default:
            return .None
        }
    }
}

enum DataType {
    case FigureValue, DateTime, Grade
}

struct MicroDustInfo: Decodable {
    let pm10Grade1h: String
    let pm10Value: String
    let dateTime: String
}
