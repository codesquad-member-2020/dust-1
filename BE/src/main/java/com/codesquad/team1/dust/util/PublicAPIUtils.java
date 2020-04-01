package com.codesquad.team1.dust.util;

import com.codesquad.team1.dust.domain.DustStatus;
import org.json.JSONArray;
import org.json.JSONObject;
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

    public static JSONObject getForecastJSONObject(String searchDate) throws URISyntaxException {
        log.debug("검색한 날짜: {}", searchDate);
        URI publicApiRequestUrl = new URI(PUBLIC_API_FORECAST_URL_AND_SEARCH_DATE + searchDate
                + AND_SERVICE_KEY + PUBLIC_API_SERVICE_KEY + AND_RETURN_TYPE_JSON);
        log.debug("requestUrl: {}", publicApiRequestUrl);

        String response = restTemplate.getForObject(publicApiRequestUrl, String.class);
        log.debug("response: {}", response);
        JSONObject forecastObject = new JSONObject(response).getJSONArray("list").getJSONObject(0);
        log.debug("forecastJSONObject: {}", forecastObject);

        return forecastObject;
    }

    public static List<DustStatus> getDailyDustStatusJSONArray(String stationName) throws URISyntaxException {
        List<DustStatus> dustStatusList = new ArrayList<>();
        URI publicApiRequestUrl = new URI(PUBLIC_API_REALTIME_MEASURE_URL + stationName
                + AND_DATA_TERM_DAILY + AND_PAGE_NO_1 + AND_NUM_OF_ROWS_24 + AND_SERVICE_KEY + PUBLIC_API_SERVICE_KEY
                + AND_VERSION + 1.3 + AND_RETURN_TYPE_JSON);
        log.debug("requestUrl: {}", publicApiRequestUrl);

        String response = restTemplate.getForObject(publicApiRequestUrl, String.class);
        log.debug("response: {}", response);

        JSONArray dustStatuses = new JSONObject(response).getJSONArray("list");
        log.debug("dustStatuses: {}", dustStatuses);

        for (Object dustStatusObject : dustStatuses) {
            JSONObject dustStatusJSONObject = (JSONObject) dustStatusObject;
            dustStatusList.add(new DustStatus(dustStatusJSONObject));
        }
        log.debug("dustStatusList: {}", dustStatusList);

        return dustStatusList;
    }

    private PublicAPIUtils() {}
}
