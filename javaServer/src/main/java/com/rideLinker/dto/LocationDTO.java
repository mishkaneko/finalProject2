package com.rideLinker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LocationDTO {
    @JsonProperty("lat")
    public Double lat;
    @JsonProperty("lng")
    public Double lng;
    @JsonProperty("name")
    public String name;

    @Override
    public String toString() {
        return lat + "," + lng;
    }
}
