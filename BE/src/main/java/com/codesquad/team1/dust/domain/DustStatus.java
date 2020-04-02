package com.codesquad.team1.dust.domain;

import com.fasterxml.jackson.databind.JsonNode;

public class DustStatus {

    private String pm10Grade1h;
    private String pm10Value;
    private String dateTime;

    public DustStatus(JsonNode dustStatusJSONObject) {
        this.pm10Grade1h = getPm10Grade1hFrom(dustStatusJSONObject);
        this.pm10Value = getPm10ValueFrom(dustStatusJSONObject);
        this.dateTime = dustStatusJSONObject.get("dataTime").asText();
    }

    public DustStatus(String pm10Grade1h, String pm10Value, String dateTime) {
        this.pm10Grade1h = pm10Grade1h;
        this.pm10Value = pm10Value;
        this.dateTime = dateTime;
    }

    private String getPm10ValueFrom(JsonNode dustStatusJSONObject) {
        String pm10ValueJSON = dustStatusJSONObject.get("pm10Value").asText();
        return pm10ValueJSON.equals("-") ? "-1" : pm10ValueJSON;
    }

    private String getPm10Grade1hFrom(JsonNode dustStatusJSONObject) {
        String pm10Grade1hJSON = dustStatusJSONObject.get("pm10Grade1h").asText();
        return pm10Grade1hJSON.equals("") ? "-1" : pm10Grade1hJSON;
    }

    public String getPm10Grade1h() {
        return pm10Grade1h;
    }

    public void setPm10Grade1h(String pm10Grade1h) {
        this.pm10Grade1h = pm10Grade1h;
    }

    public String getPm10Value() {
        return pm10Value;
    }

    public void setPm10Value(String pm10Value) {
        this.pm10Value = pm10Value;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    @Override
    public String toString() {
        return "DustStatus{" + "pm10Grade1h=" + pm10Grade1h + ", pm10Value=" + pm10Value + ", dateTime='" + dateTime + '\'' + '}';
    }
}
