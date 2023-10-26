package com.rideLinker.dto.ride;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PostRideMatchCancellationRequestDTO {

    @JsonProperty("user_id")
    public Long userId;
    @JsonProperty("ride_id")
    public Long ride_id;
    @JsonProperty("match_id")
    public Long match_id;
}
