package com.rideLinker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public class DistanceTimeResDTO {
    @JsonProperty("duration_in_seconds")
   public Double durationInSeconds;

    @JsonProperty("distance_in_meters")
    public Double distanceInMeters;
}
