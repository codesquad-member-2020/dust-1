//
//  MicroDustTableViewCell.swift
//  dustProject
//
//  Created by Keunna Lee on 2020/03/31.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import UIKit

class MicroDustTableViewCell: UITableViewCell {
    static let identifier = "microDustCell"
    
    @IBOutlet var percentageView: PercentageView!
    
    @IBOutlet var figureValueLabel: FigureValueLabel!
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        print(percentageView.constraints)
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
    
    func setPercentage(_ fillWidth: CGFloat) {
        percentageView.frame = CGRect(x: 0, y: 0, width: fillWidth, height: 30)
    }
}
