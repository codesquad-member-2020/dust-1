//
//  ForecastViewController.swift
//  DustProject
//
//  Created by Keunna Lee on 2020/03/31.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import UIKit

class ForecastViewController: UIViewController {
    
    @IBOutlet var imageSlider: UISlider!
    @IBOutlet var informOverall: UILabel!
    @IBOutlet var informGrade: UILabel!
    @IBOutlet var microDustImageView: UIImageView!
    @IBAction func runButtonTapped(_ sender: Any) {
        self.progressBarTimer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(self.sliderValueChanged(_:)), userInfo: nil, repeats: true)
        
    }
    private var progressBarTimer : Timer!
    private let progress = Progress(totalUnitCount: 10)
    private let forecastDataManager = ForecastDataManager()
    private var microDustImageInfo : [ImageInfo]?
    private var isRunning = true
    var imagesArray = [UIImage]()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        imageSlider.value = 0.0
        forecastDataManager.decodeMicroDustImageJson()
        guard let imageInfos = forecastDataManager.giveMicroDustImage() else { return }
        self.microDustImageInfo = imageInfos
        let informOverall = forecastDataManager.giveInformOverall()
        self.informOverall.text = informOverall
        let informGrade = forecastDataManager.giveInformGrade()
        self.informGrade.text = informGrade
    }
    
    @IBAction func sliderValueChanged(_ sender: Any) {
        DispatchQueue.main.async {
            self.imageSlider.value += 0.1
            do { try? self.microDustImageInfo?.forEach{
                image in
                guard let url = URL(string: "\(image.imageUrl)") else { return }
                let imageData = try Data(contentsOf: url)
                guard let images = UIImage(data: imageData) else { return }
                self.microDustImageView.image = images
                self.imagesArray.append(images)
                self.microDustImageView.animationImages = self.imagesArray
                self.microDustImageView.animationDuration = 10.0
                self.microDustImageView.startAnimating()
                if(self.imageSlider.value
                    == 1.0)
                {
                    self.progressBarTimer.invalidate()
                    self.microDustImageView.stopAnimating()
                    self.isRunning = false
                }
                }
            }
        }
    }
}
