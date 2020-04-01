package com.codesquad.team1.dust.domain;

import org.json.JSONObject;

public class StationLocation {

    private String stationName;
    private String location;

    public StationLocation(String stationName, String location) {
        this.stationName = stationName;
        this.location = location;
    }

    public StationLocation(JSONObject nearestJSONObject) {
        this.stationName = nearestJSONObject.getString("stationName");
        this.location = nearestJSONObject.getString("addr");
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "Location{" + "stationName='" + stationName + '\'' + ", location='" + location + '\'' + '}';
    }
}
