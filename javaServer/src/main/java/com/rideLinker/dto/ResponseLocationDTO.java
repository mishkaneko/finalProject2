package com.rideLinker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;

public class ResponseLocationDTO {
    @JsonProperty("lat")
    public Double lat;
    @JsonProperty("lng")
    public Double lng;
    @JsonProperty("name")
    public String name;
    @JsonProperty("arrive_time")
    public Timestamp arrive_time;

}
