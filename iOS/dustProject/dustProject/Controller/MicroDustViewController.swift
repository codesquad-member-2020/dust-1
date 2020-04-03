//
//  MicroDustViewController.swift
//  DustProject
//
//  Created by Keunna Lee on 2020/03/31.
//  Copyright © 2020 dev-Lena. All rights reserved.
//

import UIKit
import CoreLocation

class MicroDustViewController: UIViewController {
    
    private let dataSource = MicroDustTableDataSource()
    private let delegate = MicroDustTableViewDelegate()
    private let cellHeight = 30
    private let locationDataManager = LocationDataManager()
    @IBOutlet var backgroundView: BackgroundView!
    @IBOutlet weak var microDustTableView: UITableView!
    @IBOutlet var emojiImageView: UIImageView!
    @IBOutlet var conditionLabel: ConditionLabel!
    @IBOutlet var figureLabel: UILabel!
    @IBOutlet var dateLabel: UILabel!
    @IBOutlet var dateTimeLabel: UILabel!
    @IBOutlet var locationLabel: UILabel!
    private var nearestStation = ""
    var locationManager =        CLLocationManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupTableView()
        setupNotification()
        recognizeUserLocation()
        guard let stationName = locationDataManager.locationInfo?.stationName else { return }
        self.nearestStation = stationName
        self.locationLabel.text = self.nearestStation
    }
    
    private func recognizeUserLocation() {
        locationManager.requestWhenInUseAuthorization()
             var currentLocation: CLLocation!
        currentLocation = locationManager.location
        var latitude = currentLocation.coordinate.latitude
        if latitude == nil {
            var latitude = 37.4908447265625
        }
        var longitude = currentLocation.coordinate.longitude
        if longitude == nil {
            var longitude = 127.03370747206644
        }
        
        
        locationDataManager.requestLocation(latitude: latitude, longitude: longitude)
        let nearestStation = locationDataManager.giveStationName()
        self.nearestStation = nearestStation
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self, name: MicroDustDataManager.MicroDustDecodedNotification, object: nil)
        NotificationCenter.default.removeObserver(self, name: MicroDustTableViewDelegate.MicroFirstCellIndexNotification, object: nil)
    }
    
    private func setupTableView() {
        microDustTableView.dataSource = dataSource
        microDustTableView.delegate = delegate
        microDustTableView.rowHeight = CGFloat(cellHeight)
    }
    
    private func setupNotification() {
        NotificationCenter.default.addObserver(self, selector: #selector(reloadTableView), name: MicroDustDataManager.MicroDustDecodedNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(updateViewInformation), name: MicroDustTableViewDelegate.MicroFirstCellIndexNotification, object: nil)
    }
    
    @objc private func reloadTableView(notification: Notification) {
        DispatchQueue.main.async {
            self.microDustTableView.reloadData()
        }
    }
    
    @objc private func updateViewInformation(notification: Notification) {
        emojiImageView.image = nil
        conditionLabel.text = nil
        figureLabel.text = nil
        dateLabel.text = nil
        dateTimeLabel.text = nil
        locationLabel.text = nil

        guard let firstIndexCell = notification.userInfo?["firstCellIndex"] as? IndexPath else { return }
        let firstCell = self.microDustTableView.cellForRow(at: firstIndexCell) as? MicroDustTableViewCell
        guard let figure = firstCell?.figureValue else { return }
            self.figureLabel.text = figure
        guard let givenDateTime =  firstCell?.dateTime else { return }
            let dateTimes = self.handleDateTime(dateTime: givenDateTime)
            self.dateTimeLabel.text = dateTimes.1
            let condition = self.noticeCondition(grade: firstCell!.grade)
        self.conditionLabel.text = condition.0
        self.backgroundView.colors[0] = UIColor(named: "\(condition.1)")!.cgColor
        let emojiImage = #imageLiteral(resourceName: "\(condition.2)")
        self.emojiImageView.image = emojiImage
    }
    
    private func noticeCondition(grade : Grade) -> (String,String,String) {
        switch grade {
        case .Great: return ("좋음","classicBlue", "best")
        case .Nomal: return ("보통","frogGreen", "normal")
        case .Bad: return ("나쁨","orangeOrange", "bad")
        case .Terrible: return ("매우 나쁨","strawberryRed", "terrible")

        default:
            return ("🌸","classicBlue","bad")
        }
    }
    
    private func handleDateTime(dateTime: String) -> (String,String){
        let dates = dateTime.components(separatedBy: " ")
        let date = dates[0]
        let time = dates[1]
        let dateTimes = (date,time)
        return dateTimes
    }
}
