package com.rideLinker.dto.ride;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PostRideRejectByRideIdResponseDTO {
    @JsonProperty("error")
    public String error;
}
