//
//  MicroDustTableDataSource.swift
//  DustProject
//
//  Created by Keunna Lee on 2020/03/31.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import UIKit

class MicroDustTableDataSource: NSObject, UITableViewDataSource {
    
    var dustInfo : [MicroDustInfo] = []
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "microDustCell", for: indexPath)
        let dataForNow = dustInfo[indexPath.row]
        return cell
    }
}
