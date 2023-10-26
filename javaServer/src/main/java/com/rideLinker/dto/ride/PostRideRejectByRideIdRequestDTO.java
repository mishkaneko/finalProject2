package com.rideLinker.dto.ride;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PostRideRejectByRideIdRequestDTO {
    @JsonProperty("user_id")
    public Long userId;

}
