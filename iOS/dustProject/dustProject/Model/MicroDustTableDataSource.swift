//
//  MicroDustTableDataSource.swift
//  DustProject
//
//  Created by Keunna Lee on 2020/03/31.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import UIKit

class MicroDustTableDataSource: NSObject, UITableViewDataSource {
    
    private let totalWidth = CGFloat(200.0)
    private let microDustDataManager = MicroDustDataManager()
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        guard let count = microDustDataManager.microDustInfoCount() else { return 0 }
        return count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: MicroDustTableViewCell.identifier, for: indexPath) as! MicroDustTableViewCell
        
        // Bring Data
        var figureValue =  microDustDataManager.giveFigureData(for: indexPath.item)
        var dateTime = microDustDataManager.giveDateTImeData(for: indexPath.item)
        let givenGrade = microDustDataManager.giveGradeData(for: indexPath.item)
        
        // Deal with nil value
        if figureValue == "-1" || dateTime == nil {
            figureValue = " X "
            dateTime = " X "
        }
        var grade = Grade(rawValue: givenGrade)
        if grade == nil {
            grade = .None
        }
        
        // Setup views in cell
        cell.figureValueLabel.text = figureValue
        let percentageColor = self.setCellBackground(grade: grade!)
        cell.percentageView.backgroundColor = percentageColor
        let floatValue = CGFloat(NSString(string: figureValue).floatValue)
        let fillWidth : CGFloat = (floatValue / totalWidth) * cell.frame.size.width
        cell.setPercentage(fillWidth)
        cell.updateViewInformation(figureValue: figureValue, dateTime: dateTime, grade: grade!)
        return cell
    }
    
    private func setCellBackground(grade: Grade) -> UIColor {
        switch grade {
        case .Great: return UIColor(named: "classicBlue")!
        case .Nomal: return UIColor(named: "frogGreen")!
        case .Bad: return UIColor(named: "orangeOrange")!
        case .Terrible: return UIColor(named: "strawberryRed")!
        default:
            return .white
        }
    }
}
