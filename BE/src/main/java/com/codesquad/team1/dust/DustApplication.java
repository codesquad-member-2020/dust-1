package com.codesquad.team1.dust;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DustApplication {

    public static void main(String[] args) {
        SpringApplication.run(DustApplication.class, args);
    }

}
