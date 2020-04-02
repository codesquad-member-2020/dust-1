package com.codesquad.team1.dust.domain;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;
import java.util.List;

public class Forecast {

    private String informOverall;
    private String informGrade;
    private List<Image> images;

    public Forecast(JsonNode forecastObject, List<String> imageURLs) {
        this.informOverall = forecastObject.get("informOverall").asText();
        this.informGrade = forecastObject.get("informGrade").asText();
        this.images = parseImages(imageURLs);
    }

    public Forecast(String informOverall, String informGrade, List<Image> images) {
        this.informOverall = informOverall;
        this.informGrade = informGrade;
        this.images = images;
    }

    private List<Image> parseImages(List<String> imageURLs) {
        List<Image> images = new ArrayList<>();

        for (String imageURL : imageURLs)
            images.add(new Image(imageURL));

        return images;
    }

    public String getInformOverall() {
        return informOverall;
    }

    public void setInformOverall(String informOverall) {
        this.informOverall = informOverall;
    }

    public String getInformGrade() {
        return informGrade;
    }

    public void setInformGrade(String informGrade) {
        this.informGrade = informGrade;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    @Override
    public String toString() {
        return "Forecast{" + "informOverall='" + informOverall + '\'' + ", informGrade='" + informGrade + '\'' + ", images=" + images + '}';
    }
}
