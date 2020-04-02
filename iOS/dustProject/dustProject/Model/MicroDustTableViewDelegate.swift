//
//  MicroDustTableViewDelegate.swift
//  dustProject
//
//  Created by Keunna Lee on 2020/04/02.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import UIKit

class MicroDustTableViewDelegate: NSObject, UITableViewDelegate {
    
    static let MicroFirstCellIndexNotification = NSNotification.Name(rawValue: "MicroFirstCellIndexNotification")
    private var firstCell = 0
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        guard let tableView = scrollView as? UITableView else { return }
        
        // Send Notification with Data
        var firstCellIndexPath = tableView.indexPathsForVisibleRows?.first
        guard let firstIndexCell = firstCellIndexPath?.row else { return }
        self.firstCell = firstIndexCell
        sendNotification()
    }
    
    private func sendNotification() {
        NotificationCenter.default.post(name: MicroDustTableViewDelegate.MicroFirstCellIndexNotification, object: nil, userInfo: ["firstCellIndex": firstCell])
    }
}
