package com.codesquad.team1.dust.aggregate;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("daily_dust_status_json")
public class DailyDustStatusJson {

    @Id
    private int id;

    private String stationName;
    private String json;

    public DailyDustStatusJson() {}

    public DailyDustStatusJson(String stationName, JsonNode dustStatuses) {
        this.stationName = stationName;
        this.json = dustStatuses.toString();
    }

    public DailyDustStatusJson(String stationName, String json) {
        this.stationName = stationName;
        this.json = json;
    }

    public int getId() {
        return id;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }
}
