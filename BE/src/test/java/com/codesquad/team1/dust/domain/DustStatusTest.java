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
class DustStatusTest {

    private static final Logger log = LoggerFactory.getLogger(DustStatusTest.class);

    @Test
    void JsonNode로_DustStatus객체_생성_테스트() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode dustStatusJsonNode = mapper.readTree("{\"_returnType\":\"json\",\"coGrade\":\"1\",\"coValue\":\"0.5\",\"dataTerm\":\"\",\"dataTime\":\"2020-04-02 13:00\",\"khaiGrade\":\"2\",\"khaiValue\":\"69\",\"mangName\":\"도시대기\",\"no2Grade\":\"2\",\"no2Value\":\"0.033\",\"numOfRows\":\"10\",\"o3Grade\":\"2\",\"o3Value\":\"0.034\",\"pageNo\":\"1\",\"pm10Grade\":\"2\",\"pm10Grade1h\":\"2\",\"pm10Value\":\"42\",\"pm10Value24\":\"33\",\"pm25Grade\":\"2\",\"pm25Grade1h\":\"2\",\"pm25Value\":\"35\",\"pm25Value24\":\"23\",\"resultCode\":\"\",\"resultMsg\":\"\",\"rnum\":0,\"serviceKey\":\"\",\"sidoName\":\"\",\"so2Grade\":\"1\",\"so2Value\":\"0.003\",\"stationCode\":\"\",\"stationName\":\"\",\"totalCount\":\"\",\"ver\":\"\"}");
        DustStatus expected = new DustStatus("2", "42", "2020-04-02 13:00");
        DustStatus actual = new DustStatus(dustStatusJsonNode);
        assertThat(actual).isEqualToComparingFieldByField(expected);
        log.debug("JsonNode로 DustStatus 객체를 생성하는데 성공하였습니다.");
    }

}
