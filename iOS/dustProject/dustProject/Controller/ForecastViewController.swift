//
//  ForecastViewController.swift
//  DustProject
//
//  Created by Keunna Lee on 2020/03/31.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import UIKit

class ForecastViewController: UIViewController {
    
    @IBOutlet var imageProgressView: UIProgressView!
    @IBOutlet var informOverall: UILabel!
    @IBOutlet var informGrade: UILabel!
    @IBOutlet var microDustImageView: UIImageView!
    private var progressBarTimer : Timer!
    private let progress = Progress(totalUnitCount: 10)
    private let forecastDataManager = ForecastDataManager()
    private var microDustImageInfo : [ImageInfo]?
    private var a = [String]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        imageProgressView.progress = 0.0
        self.progressBarTimer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(self.updateImages), userInfo: nil, repeats: true)
        
        forecastDataManager.decodeMicroDustImageJson()
        guard let imageInfos = forecastDataManager.giveMicroDustImage() else { return }
        self.microDustImageInfo = imageInfos
        let informOverall = forecastDataManager.giveInformOverall()
        self.informOverall.text = informOverall
        let informGrade = forecastDataManager.giveInformGrade()
        self.informGrade.text = informGrade
        
    }
    
    @objc private func updateImages() {
        var imagesArray = [UIImage]()
        DispatchQueue.main.async {
            do { try? self.microDustImageInfo?.forEach { microDustImage in
                guard let url = URL(string: "\(microDustImage.imageUrl)") else { return }
                let imageData = try Data(contentsOf: url)
                guard let images = UIImage(data: imageData) else { return }
                self.microDustImageView.image = images
                imagesArray.append(images)
                self.microDustImageView.animationImages = imagesArray
                self.microDustImageView.animationDuration = 5.0
                self.microDustImageView.startAnimating()
                
                }
            }
        }
    }
}
