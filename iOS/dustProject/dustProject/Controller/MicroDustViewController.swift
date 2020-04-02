//
//  MicroDustViewController.swift
//  DustProject
//
//  Created by Keunna Lee on 2020/03/31.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import UIKit

class MicroDustViewController: UIViewController {
    
    private let dataSource = MicroDustTableDataSource()
    private let cellHeight = 30
    
    @IBOutlet weak var microDustTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupTableView()
        setupNotification()
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self, name: MicroDustDataManager.MicroDustDecodedNotification, object: nil)
    }
    
    private func setupTableView() {
        microDustTableView.dataSource = dataSource
        microDustTableView.rowHeight = CGFloat(cellHeight)
    }
    
    private func setupNotification() {
        NotificationCenter.default.addObserver(self, selector: #selector(reloadTableView), name: MicroDustDataManager.MicroDustDecodedNotification, object: nil)
    }
    
    @objc private func reloadTableView(notification: Notification) {
        DispatchQueue.main.async {
            self.microDustTableView.reloadData()
        }
    }
}
