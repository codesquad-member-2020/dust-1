package com.codesquad.team1.dust.util;

import com.codesquad.team1.dust.domain.DustStatus;
import com.codesquad.team1.dust.domain.StationLocation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import static com.codesquad.team1.dust.constants.PublicAPIConstants.*;

public class PublicAPIUtils {

    private static final Logger log = LoggerFactory.getLogger(PublicAPIUtils.class);
    private static final RestTemplate restTemplate = new RestTemplate();

    public static JsonNode getForecastJSONObject(String searchDate) throws URISyntaxException, JsonProcessingException {
        log.debug("검색한 날짜: {}", searchDate);
        URI publicApiRequestUrl = new URI(PUBLIC_API_FORECAST_URL_AND_SEARCH_DATE + searchDate
                + AND_SERVICE_KEY + PUBLIC_API_SERVICE_KEY + AND_VERSION + 1.1 + AND_RETURN_TYPE_JSON);
        log.debug("requestUrl: {}", publicApiRequestUrl);

        String response = restTemplate.getForObject(publicApiRequestUrl, String.class);
        log.debug("response: {}", response);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode forecastObject = mapper.readTree(response).get("list").get(0);
        log.debug("forecastJSONObject: {}", forecastObject);

        return forecastObject;
    }

    public static List<DustStatus> getDailyDustStatusJSONArray(String stationName) throws URISyntaxException, JsonProcessingException {
        List<DustStatus> dustStatusList = new ArrayList<>();
        URI publicApiRequestUrl = new URI(PUBLIC_API_REALTIME_MEASURE_URL + stationName
                + AND_DATA_TERM_DAILY + AND_PAGE_NO_1 + AND_NUM_OF_ROWS_24 + AND_SERVICE_KEY + PUBLIC_API_SERVICE_KEY
                + AND_VERSION + 1.3 + AND_RETURN_TYPE_JSON);
        log.debug("requestUrl: {}", publicApiRequestUrl);

        String response = restTemplate.getForObject(publicApiRequestUrl, String.class);
        log.debug("response: {}", response);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode dustStatuses = mapper.readTree(response).get("list");
        log.debug("dustStatuses: {}", dustStatuses);

        for (JsonNode dustStatusObject : dustStatuses) {
            dustStatusList.add(new DustStatus(dustStatusObject));
        }
        log.debug("dustStatusList: {}", dustStatusList);

        return dustStatusList;
    }

    public static StationLocation getNearestStationLocation(JsonNode transResultJSONObject) throws URISyntaxException, JsonProcessingException {
        Double tmX = transResultJSONObject.get("x").asDouble();
        Double tmY = transResultJSONObject.get("y").asDouble();
        log.debug("tmX: {}, tmY: {}", tmX, tmY);

        URI publicApiRequestUrl = new URI(PUBLIC_API_GET_NEARBY_MEASURE_STATION_LIST_URL_AND_TMX + tmX + AND_TMY
                + tmY + AND_SERVICE_KEY + PUBLIC_API_SERVICE_KEY + AND_RETURN_TYPE_JSON);
        log.debug("requestUrl: {}", publicApiRequestUrl);

        String response = restTemplate.getForObject(publicApiRequestUrl, String.class);
        log.debug("response: {}", response);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode nearestJSONObject = mapper.readTree(response).get("list").get(0);

        return new StationLocation(nearestJSONObject);
    }

    private PublicAPIUtils() {}
}
