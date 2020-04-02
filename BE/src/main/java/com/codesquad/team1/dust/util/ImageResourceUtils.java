package com.codesquad.team1.dust.util;

import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ImageResourceUtils {

    private static final Logger log = LoggerFactory.getLogger(ImageResourceUtils.class);
    private static final String IMAGES_DIR_PATH = System.getProperty("user.dir") + "/src/main/resources/static/images";
    private static final String IMAGES_URL_PATH = "http://ec2-15-164-254-158.ap-northeast-2.compute.amazonaws.com:8080/images/";

    public static List<String> parseImageURLs(JsonNode forecastObject) {
        log.debug("pm10 gif imageUrl7 : {}", forecastObject.get("imageUrl7"));
        log.debug("resource path : {}", IMAGES_DIR_PATH);
        excuteGIFSplit(String.format("convert %s %s/forecast-%%02d.png", forecastObject.get("imageUrl7"), IMAGES_DIR_PATH));
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
        File[] files = new File(IMAGES_DIR_PATH).listFiles();
        return (files == null) ? new ArrayList<>() : getOrderedImageURLs(files);
    }

    private static List<String> getOrderedImageURLs(File[] files) {
        List<String> imageURLs = new ArrayList<>();
        for (File file : files) {
            String fileName = file.getName();
            if (fileName.contains(".png"))
                imageURLs.add(IMAGES_URL_PATH + fileName);
        }
        Collections.sort(imageURLs);
        return imageURLs;
    }

    private ImageResourceUtils() {}
}
