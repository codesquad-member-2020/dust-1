package com.codesquad.team1.dust.util;

import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ImageResourceUtils {

    private static final Logger log = LoggerFactory.getLogger(ImageResourceUtils.class);
    private static final String DIR_IMAGES_PATH = System.getProperty("user.dir") + "/src/main/resources/static/images";
    private static final String IMAGE_URI = "http://ec2-15-164-254-158.ap-northeast-2.compute.amazonaws.com:8080/images/";
    private static final String IMAGE_PREFIX = "forecast";
    private static final int MAX_IMAGES = 48;

    public static List<String> parseImageURLs(JsonNode forecastObject) {
        log.debug("pm10 gif imageUrl7 : {}", forecastObject.get("imageUrl7"));
        log.debug("resource path : {}", DIR_IMAGES_PATH);
        excuteGIFSplit(String.format("convert %s %s/%s.png", forecastObject.get("imageUrl7"), DIR_IMAGES_PATH, IMAGE_PREFIX));
        return getImageURLs();
    }

    private static void excuteGIFSplit(String command) {
        Runtime runtime = Runtime.getRuntime();
        Process process = null;
        try {
            // 명령어 실행
            process = runtime.exec(readyCommandLists(command));
            // 프로세스의 수행이 끝날때까지 대기
            process.waitFor();
            // shell 실행이 정상 종료되었을 경우
            if (process.exitValue() != 0) {
                log.info("linux Command Run Fail");
                return;
            }
            log.info("linux Command Run Success");
        } catch (IOException | InterruptedException e) {
            log.debug("excuteGIFSplit() exception : {}", e.getMessage());
        } finally {
            if (process != null)
                process.destroy();
        }
    }

    private static String[] readyCommandLists(String command) {
        // 명령어 셋팅
        List<String> commandList = new ArrayList<String>();
        commandList.add("/bin/sh");
        commandList.add("-c");
        commandList.add(command);
        return commandList.toArray(new String[commandList.size()]);
    }

    private static List<String> getImageURLs() {
        List<String> imageURLs = new ArrayList<>();
        for (int i = 0; i < MAX_IMAGES; ++i)
            imageURLs.add(String.format("%s%s-%d.png", IMAGE_URI, IMAGE_PREFIX, i));
        return imageURLs;
    }

    private ImageResourceUtils() {}
}
