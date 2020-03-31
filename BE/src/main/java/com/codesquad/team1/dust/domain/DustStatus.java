package com.codesquad.team1.dust.domain;

public class DustStatus {

    private String pm10Grade1h;
    private String pm10Value;
    private String dateTime;

    public DustStatus(String pm10Grade1h, String pm10Value, String dateTime) {
        this.pm10Grade1h = pm10Grade1h;
        this.pm10Value = pm10Value;
        this.dateTime = dateTime;
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
