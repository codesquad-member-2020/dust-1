package com.codesquad.team1.dust.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class StationLocationTest {

    private static final Logger log = LoggerFactory.getLogger(StationLocationTest.class);

    @Test
    void JsonNode로_StationLocation객체_생성_테스트() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode forecastJsonNode = mapper.readTree("{\"_returnType\":\"json\",\"addr\":\"서울 서초구 강남대로 201서초구민회관 앞 중앙차로\",\"districtNum\":\"\",\"dmX\":\"\",\"dmY\":\"\",\"item\":\"\",\"mangName\":\"\",\"map\":\"\",\"numOfRows\":\"10\",\"oper\":\"\",\"pageNo\":\"1\",\"photo\":\"\",\"resultCode\":\"\",\"resultMsg\":\"\",\"rnum\":0,\"serviceKey\":\"\",\"sggName\":\"\",\"sidoName\":\"\",\"stationCode\":\"\",\"stationName\":\"강남대로\",\"tm\":0.9,\"tmX\":\"\",\"tmY\":\"\",\"totalCount\":\"\",\"umdName\":\"\",\"ver\":\"\",\"vrml\":\"\",\"year\":\"\"}");

        StationLocation expected = new StationLocation("강남대로", "서울 서초구 강남대로 201서초구민회관 앞 중앙차로");
        StationLocation actual = new StationLocation(forecastJsonNode);

        assertThat(actual).isEqualToComparingFieldByField(expected);
        log.debug("JsonNode로 StationLocation 객체를 생성하는데 성공하였습니다.");
    }

}
