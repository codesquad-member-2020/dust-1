package com.codesquad.team1.dust.domain;

public class DustStatus {

    private int pm10Grade1h;
    private int pm10Value;
    private String location;

    public DustStatus(int pm10Grade1h, int pm10Value, String location) {
        this.pm10Grade1h = pm10Grade1h;
        this.pm10Value = pm10Value;
        this.location = location;
    }

    public int getPm10Grade1h() {
        return pm10Grade1h;
    }

    public void setPm10Grade1h(int pm10Grade1h) {
        this.pm10Grade1h = pm10Grade1h;
    }

    public int getPm10Value() {
        return pm10Value;
    }

    public void setPm10Value(int pm10Value) {
        this.pm10Value = pm10Value;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "DustStatus{" + "pm10Grade1h=" + pm10Grade1h + ", pm10Value=" + pm10Value + ", location='" + location + '\'' + '}';
    }
}
