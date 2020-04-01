package com.codesquad.team1.dust.domain;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class Forecast {

    private String informOverall;
    private String informGrade;
    private List<Image> images;

    public Forecast(JSONObject forecastObject) {
        this.informOverall = forecastObject.getString("informOverall");
        this.informGrade = forecastObject.getString("informGrade");
        this.images = parseImages(forecastObject);
    }

    private List<Image> parseImages(JSONObject forecastObject) {
        List<Image> images = new ArrayList<>();

        images.add(new Image(forecastObject.getString("imageUrl1")));
        images.add(new Image(forecastObject.getString("imageUrl2")));
        images.add(new Image(forecastObject.getString("imageUrl3")));

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
