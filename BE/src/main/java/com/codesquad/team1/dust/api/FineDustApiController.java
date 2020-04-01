package com.codesquad.team1.dust.api;

import com.codesquad.team1.dust.domain.DustStatus;
import com.codesquad.team1.dust.domain.Forecast;
import com.codesquad.team1.dust.domain.StationLocation;
import com.codesquad.team1.dust.util.PublicAPIUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;
import java.time.LocalDate;
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

    @GetMapping("/{stationName}/daily-dust-status")
    public List<DustStatus> showDailyDustStatus(@PathVariable String stationName) {
        List<DustStatus> dustStatusList = new ArrayList<>();

        log.debug("stationName: {}", stationName);

        dustStatusList.add(new DustStatus("4", "205", "2020-03-31 12:00"));
        dustStatusList.add(new DustStatus("4", "180", "2020-03-31 11:00"));
        dustStatusList.add(new DustStatus("2", "55", "2020-03-31 10:00"));
        dustStatusList.add(new DustStatus("2", "51", "2020-03-31 09:00"));
        dustStatusList.add(new DustStatus("2", "42", "2020-03-31 08:00"));
        dustStatusList.add(new DustStatus("2", "41", "2020-03-31 07:00"));
        dustStatusList.add(new DustStatus("1", "0", "2020-03-31 06:00"));
        dustStatusList.add(new DustStatus("1", "30", "2020-03-31 05:00"));
        dustStatusList.add(new DustStatus("2", "36", "2020-03-31 04:00"));
        dustStatusList.add(new DustStatus("2", "38", "2020-03-31 03:00"));
        dustStatusList.add(new DustStatus("3", "99", "2020-03-31 02:00"));
        dustStatusList.add(new DustStatus("3", "150", "2020-03-31 01:00"));
        dustStatusList.add(new DustStatus("2", "35", "2020-03-30 24:00"));
        dustStatusList.add(new DustStatus("3", "81", "2020-03-30 23:00"));
        dustStatusList.add(new DustStatus("2", "39", "2020-03-30 22:00"));
        dustStatusList.add(new DustStatus("2", "42", "2020-03-30 21:00"));
        dustStatusList.add(new DustStatus("4", "151", "2020-03-30 20:00"));
        dustStatusList.add(new DustStatus("2", "54", "2020-03-30 19:00"));
        dustStatusList.add(new DustStatus("2", "80", "2020-03-30 18:00"));
        dustStatusList.add(new DustStatus("2", "52", "2020-03-30 17:00"));
        dustStatusList.add(new DustStatus("-1", "-1", "2020-03-30 16:00"));
        dustStatusList.add(new DustStatus("-1", "-1", "2020-03-30 15:00"));
        dustStatusList.add(new DustStatus("2", "49", "2020-03-30 14:00"));
        dustStatusList.add(new DustStatus("1", "15", "2020-03-30 13:00"));
        dustStatusList.add(new DustStatus("2", "51", "2020-03-30 12:00"));

        log.debug("dustStatusList: {}", dustStatusList);

        return dustStatusList;
    }

    @GetMapping("/location/@={latitude},{longitude}")
    public StationLocation showNearestMeasureStationLocation(@PathVariable String latitude,
                                                             @PathVariable String longitude) {
        StationLocation stationLocation = new StationLocation("강남구", "서울 강남구 학동로 426강남구청 별관 1동");

        log.debug("위도: {}, 경도: {}", latitude, longitude);
        log.debug("stationLocation: {}", stationLocation);

        return stationLocation;
    }

    @GetMapping("/forecast")
    public Forecast showForecastOfFineDust() throws URISyntaxException {
        String today = LocalDate.now().toString();
        Forecast forecast = new Forecast(PublicAPIUtils.getForecastJSONObject(today));

        log.debug("forecast: {}", forecast);

        return forecast;
    }

}
