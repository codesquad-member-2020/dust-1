package com.codesquad.team1.dust.api;

import com.codesquad.team1.dust.domain.DustStatus;
import com.codesquad.team1.dust.domain.Forecast;
import com.codesquad.team1.dust.domain.Image;
import com.codesquad.team1.dust.domain.StationLocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FineDustApiController {

    private static final Logger log = LoggerFactory.getLogger(FineDustApiController.class);

    @GetMapping("/locations")
    public List<StationLocation> showStationLocations() {
        List<StationLocation> stationLocations = new ArrayList<>();

        stationLocations.add(new StationLocation("강남구", "서울 강남구 학동로 426강남구청 별관 1동"));
        stationLocations.add(new StationLocation("구로구", "서울 구로구 가마산로 27길 45구로고등학교"));

        log.debug("list: {}", stationLocations);

        return stationLocations;
    }

    @GetMapping("/{stationName}/dust-status")
    public DustStatus showDustStatus(@PathVariable String stationName) {
        DustStatus dustStatus = new DustStatus(2, 74, stationName);

        log.debug("dustStatus: {}", dustStatus);

        return dustStatus;
    }

    @GetMapping("/location/@={latitude},{longitude}")
    public StationLocation showNearestMeasureStationLocation(@PathVariable String latitude, @PathVariable String longitude) {
        StationLocation stationLocation = new StationLocation("강남구", "서울 강남구 학동로 426강남구청 별관 1동");

        log.debug("위도: {}, 경도: {}", latitude, longitude);
        log.debug("stationLocation: {}", stationLocation);

        return stationLocation;
    }

    // 날짜는 Default로 금일
    @GetMapping("/forecast")
    public Forecast showForecastOfFineDust() {
        List<Image> images = new ArrayList<>();
        Image image1 =  new Image("http://www.airkorea.or.kr/file/viewImage/?atch_id=138845");
        Image image2 =  new Image("http://www.airkorea.or.kr/file/viewImage/?atch_id=138846");
        Image image3 =  new Image("http://www.airkorea.or.kr/file/viewImage/?atch_id=138847");
        Image image4 =  new Image("http://www.airkorea.or.kr/file/viewImage/?atch_id=138848");
        Image image5 =  new Image("http://www.airkorea.or.kr/file/viewImage/?atch_id=138849");
        Image image6 =  new Image("http://www.airkorea.or.kr/file/viewImage/?atch_id=138850");

        images.add(image1);
        images.add(image2);
        images.add(image3);
        images.add(image4);
        images.add(image5);
        images.add(image6);

        Forecast forecast = new Forecast("○ [미세먼지] 전 권역이 '좋음'∼'보통'으로 예상됨. 다만, 경기남부·충청권은 오전에 일시적으로 '나쁨' 수준일 것으로 예상됨.",
                "서울 : 보통,제주 : 좋음,전남 : 보통,전북 : 보통,광주 : 보통,경남 : 좋음,경북 : 좋음,울산 : 좋음,대구 : 좋음,부산 : 좋음,충남 : 보통,충북 : 보통,세종 : 보통,대전 : 보통,영동 : 좋음,영서 : 보통,경기남부 : 보통,경기북부 : 보통,인천 : 보통",
                images);

        log.debug("forecast: {}", forecast);

        return forecast;
    }

}
