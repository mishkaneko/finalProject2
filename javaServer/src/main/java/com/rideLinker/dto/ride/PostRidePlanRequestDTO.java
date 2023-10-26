package com.rideLinker.dto.ride;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rideLinker.dto.LatLngDTO;
import com.rideLinker.dto.LocationDTO;
import com.rideLinker.entity.LocationEntity;

import java.sql.Timestamp;

public class PostRidePlanRequestDTO {

    @JsonProperty("user_id")
    public Long userId;

    @JsonProperty("start_point")
    public LocationDTO startPoint;

    @JsonProperty("end_point")
    public LocationDTO endPoint;

    @JsonProperty("arrive_by_time")
    public Timestamp arriveByTime;
}
