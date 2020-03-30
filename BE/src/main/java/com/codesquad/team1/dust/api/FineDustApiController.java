package com.codesquad.team1.dust.api;

import com.codesquad.team1.dust.domain.DustStatus;
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

}
