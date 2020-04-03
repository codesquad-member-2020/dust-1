package com.codesquad.team1.dust.batch;

import com.codesquad.team1.dust.aggregate.DailyDustStatusJson;
import com.codesquad.team1.dust.aggregate.DailyDustStatusJsonRepository;
import com.codesquad.team1.dust.util.PublicAPIUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.net.URISyntaxException;
import java.time.LocalDateTime;

import static java.time.format.DateTimeFormatter.ISO_LOCAL_TIME;

@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private final DailyDustStatusJsonRepository dailyDustStatusJsonRepository;

    public ScheduledTasks(DailyDustStatusJsonRepository dailyDustStatusJsonRepository) {
        this.dailyDustStatusJsonRepository = dailyDustStatusJsonRepository;
    }

    @Scheduled(cron = "0 0 * * * *") // 초 분 시 일 월 요일
    public void scheduledTask() throws URISyntaxException, JsonProcessingException {
        String currentTime = LocalDateTime.now().format(ISO_LOCAL_TIME);
        log.debug("**********************************");
        log.debug("현재 시각: {}", currentTime);
        log.debug("**********************************");

        dailyDustStatusJob();
    }

    public void dailyDustStatusJob() throws URISyntaxException, JsonProcessingException {
        log.debug("일일 미세먼지 상태 Job 시작");

        String stationName = "강남대로";
        JsonNode dustStatuses = PublicAPIUtils.getDailyDustStatusJSONArray(stationName);
        dailyDustStatusJsonRepository.save(new DailyDustStatusJson(stationName, dustStatuses));

        log.debug("일일 미세먼지 상태 Job 종료");
    }
}
