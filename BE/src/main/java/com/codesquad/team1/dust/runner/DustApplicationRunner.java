package com.codesquad.team1.dust.runner;

import com.codesquad.team1.dust.util.ResourceUtils;
import com.codesquad.team1.dust.util.PublicAPIUtils;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DustApplicationRunner implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) throws Exception {
        String today = LocalDate.now().toString();
        JsonNode forecastObject = PublicAPIUtils.getForecastJSONObject(today);
        ResourceUtils.convertGIFtoPNGs(forecastObject);
    }
}
