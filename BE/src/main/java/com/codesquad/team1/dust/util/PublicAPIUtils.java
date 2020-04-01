package com.codesquad.team1.dust.util;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

import static com.codesquad.team1.dust.constants.CommonConstants.AND_RETURN_TYPE_JSON;
import static com.codesquad.team1.dust.constants.CommonConstants.AND_SERVICE_KEY;
import static com.codesquad.team1.dust.constants.CommonConstants.PUBLIC_API_FORECAST_URL_AND_SEARCH_DATE;
import static com.codesquad.team1.dust.constants.CommonConstants.PUBLIC_API_SERVICE_KEY;

public class PublicAPIUtils {

    private static final Logger log = LoggerFactory.getLogger(PublicAPIUtils.class);

    public static JSONObject getForecastJSONObject(String searchDate) throws URISyntaxException {
        URI publicApiRequestUrl = new URI(PUBLIC_API_FORECAST_URL_AND_SEARCH_DATE + searchDate
                + AND_SERVICE_KEY + PUBLIC_API_SERVICE_KEY + AND_RETURN_TYPE_JSON);

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(publicApiRequestUrl, String.class);
        JSONObject forecastObject = new JSONObject(response).getJSONArray("list").getJSONObject(0);

        log.debug("검색한 날짜: {}", searchDate);
        log.debug("requestUrl: {}", publicApiRequestUrl);
        log.debug("response: {}", response);
        log.debug("forecastJSONObject: {}", forecastObject);

        return forecastObject;
    }

}
