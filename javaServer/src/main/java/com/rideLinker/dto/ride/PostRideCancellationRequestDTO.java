package com.rideLinker.dto.ride;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PostRideCancellationRequestDTO {
    @JsonProperty("ride_id")
    public long ride_id;

}
