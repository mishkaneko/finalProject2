package com.rideLinker.dto.ride;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PostRideMatchRejectionRequestDTO {

    @JsonProperty("user_id")
    public Long userId;
    @JsonProperty("ride_id")
    public Long ride_id;

}
