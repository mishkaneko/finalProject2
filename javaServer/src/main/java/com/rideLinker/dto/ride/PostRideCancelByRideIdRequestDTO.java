package com.rideLinker.dto.ride;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PostRideCancelByRideIdRequestDTO {
    @JsonProperty("cancel")
    public String cancel;
}
