package com.codesquad.team1.dust.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ForecastTest {

    private static final Logger log = LoggerFactory.getLogger(Forecast.class);

    @Test
    void JsonNode로_Forecast객체_생성_테스트() throws JsonProcessingException {
        final String fileName = "forecast-";
        final int maxOfImages = 47;
        ObjectMapper mapper = new ObjectMapper();
        JsonNode forecastJsonNode = mapper.readTree("{\"_returnType\":\"json\",\"actionKnack\":\"\",\"dataTime\":\"2020-03-30 23시 발표\",\"f_data_time\":\"2020033023\",\"f_data_time1\":\"20200330\",\"f_data_time2\":\"20200331\",\"f_data_time3\":\"20200401\",\"f_inform_data\":\"20200330\",\"imageUrl1\":\"http://www.airkorea.or.kr/file/viewImage/?atch_id=138845\",\"imageUrl2\":\"http://www.airkorea.or.kr/file/viewImage/?atch_id=138846\",\"imageUrl3\":\"http://www.airkorea.or.kr/file/viewImage/?atch_id=138847\",\"imageUrl4\":\"http://www.airkorea.or.kr/file/viewImage/?atch_id=138848\",\"imageUrl5\":\"http://www.airkorea.or.kr/file/viewImage/?atch_id=138849\",\"imageUrl6\":\"http://www.airkorea.or.kr/file/viewImage/?atch_id=138850\",\"imageUrl7\":\"http://www.airkorea.or.kr/file/viewImage/?atch_id=138841\",\"imageUrl8\":\"http://www.airkorea.or.kr/file/viewImage/?atch_id=\",\"imageUrl9\":\"http://www.airkorea.or.kr/file/viewImage/?atch_id=\",\"informCause\":\"○ [미세먼지] 원활한 대기 확산으로 대기 상태가 대체로 '보통' 수준일 것으로 예상됨.\",\"informCode\":\"PM10\",\"informData\":\"2020-03-30\",\"informGrade\":\"서울 : 보통,제주 : 보통,전남 : 보통,전북 : 보통,광주 : 보통,경남 : 좋음,경북 : 좋음,울산 : 좋음,대구 : 좋음,부산 : 좋음,충남 : 보통,충북 : 보통,세종 : 보통,대전 : 보통,영동 : 좋음,영서 : 보통,경기남부 : 보통,경기북부 : 보통,인천 : 보통\",\"informOverall\":\"○ [미세먼지] 전 권역이 '좋음'∼'보통'으로 예상됨.\",\"numOfRows\":\"10\",\"pageNo\":\"1\",\"resultCode\":\"\",\"resultMsg\":\"\",\"searchDate\":\"\",\"serviceKey\":\"\",\"totalCount\":\"\",\"ver\":\"\"}");

        String informOverall = "○ [미세먼지] 전 권역이 '좋음'∼'보통'으로 예상됨.";
        String informGrade = "서울 : 보통,제주 : 보통,전남 : 보통,전북 : 보통,광주 : 보통,경남 : 좋음,경북 : 좋음,울산 : 좋음,대구 : 좋음,부산 : 좋음,충남 : 보통,충북 : 보통,세종 : 보통,대전 : 보통,영동 : 좋음,영서 : 보통,경기남부 : 보통,경기북부 : 보통,인천 : 보통";
        List<Image> images = new ArrayList<>();
        for (int i = 0; i < maxOfImages; i++) {
            String url = String.format("http://ec2-15-164-254-158.ap-northeast-2.compute.amazonaws.com:8080/images/%s%02d.png", fileName, i);
            images.add(new Image(url));
        }

        Forecast expected = new Forecast(informOverall, informGrade, images);
        Forecast actual = new Forecast(forecastJsonNode, images);
        assertThat(actual).isEqualToComparingFieldByField(expected);
        log.debug("JsonNode로 Forecast 객체를 생성하는데 성공하였습니다.");
    }

}
