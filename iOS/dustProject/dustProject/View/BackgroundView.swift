//
//  BackgroundView.swift
//  DustProject
//
//  Created by Keunna Lee on 2020/03/31.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import UIKit

class BackgroundView: UIView {
    
    private let gradientLayer: CAGradientLayer = {
        let layer = CAGradientLayer()
        layer.borderColor = UIColor.blue.cgColor
        layer.borderWidth = CGFloat(0.5)
        return layer
    }()
    
    override func draw(_ rect: CGRect) {
        self.layer.addSublayer(gradientLayer)
        gradientLayer.frame = self.bounds
        gradientLayer.startPoint = self.startPoint
        gradientLayer.endPoint = self.endPoint
        gradientLayer.colors = self.colors
        gradientLayer.type = self.type
    }
    
    public var colors: [CGColor] = [UIColor(named: "classicBlue")!.cgColor, UIColor.white.cgColor] {
        didSet{
            self.gradientLayer.colors = self.colors
        }
    }
    
    public var startPoint: CGPoint = CGPoint(x: 0.0, y: 0.0) {
        didSet {
            self.gradientLayer.startPoint = startPoint
        }
    }
    
    public var endPoint: CGPoint = CGPoint(x: 0.0, y: 1.0) {
        didSet{
            self.gradientLayer.endPoint = self.endPoint
        }
    }
    
    public var type: CAGradientLayerType = .axial {
        didSet {
            gradientLayer.type = self.type
        }
    }
}
