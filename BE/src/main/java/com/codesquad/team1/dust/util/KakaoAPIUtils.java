package com.codesquad.team1.dust.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

import static com.codesquad.team1.dust.constants.KakaoAPIConstants.*;

public class KakaoAPIUtils {

    private static final Logger log = LoggerFactory.getLogger(KakaoAPIUtils.class);
    private static final RestTemplate restTemplate = new RestTemplate();

    public static JsonNode getTmCoordinateSystem(String latitude, String longitude) throws URISyntaxException, JsonProcessingException {
        URI kakaoApiRequestUrl = new URI(KAKAO_API_TRANS_GEO_COORDINATE_SYSTEM_AND_X + longitude
                + AND_Y + latitude + AND_INPUT_COORDINATE_SYSTEM_WGS84 + AND_OUTPUT_COORDINATE_SYSTEM_TM);
        log.debug("requestUtl: {}", kakaoApiRequestUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + KAKAO_API_APP_KEY);
        log.debug("headers: {}", headers);

        HttpEntity<String> httpEntity = new HttpEntity<>(headers);
        log.debug("httpEntity: {}", httpEntity);

        String response = restTemplate.exchange(kakaoApiRequestUrl, HttpMethod.GET, httpEntity, String.class).getBody();
        log.debug(response);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode transResultJSONObject = mapper.readTree(response).get("documents").get(0);
        log.debug("transResultJSONObject: {}", transResultJSONObject);

        return transResultJSONObject;
    }

    private KakaoAPIUtils() {}

}
