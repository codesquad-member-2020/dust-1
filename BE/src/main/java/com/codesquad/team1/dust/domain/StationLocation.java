package com.codesquad.team1.dust.domain;

import com.fasterxml.jackson.databind.JsonNode;

public class StationLocation {

    private String stationName;
    private String location;

    public StationLocation(String stationName, String location) {
        this.stationName = stationName;
        this.location = location;
    }

    public StationLocation(JsonNode nearestJSONObject) {
        this.stationName = nearestJSONObject.get("stationName").asText();
        this.location = nearestJSONObject.get("addr").asText();
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
