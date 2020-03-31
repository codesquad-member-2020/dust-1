//
//  MicroDustViewController.swift
//  DustProject
//
//  Created by Keunna Lee on 2020/03/31.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import UIKit

class MicroDustViewController: UIViewController {
    //MARK: - Property
    let dataSource = MicroDustTableDataSource()
    
    //MARK: - View
    @IBOutlet weak var microDustTableView: UITableView!
    
    //MARK: - LifeCycle
    override func viewDidLoad() {
        super.viewDidLoad()
        microDustTableView.dataSource = dataSource
    }
    
    //MARK: - Function
}
