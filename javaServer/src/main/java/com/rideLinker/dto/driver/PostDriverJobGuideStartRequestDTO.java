package com.rideLinker.dto.driver;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PostDriverJobGuideStartRequestDTO {
    @JsonProperty
    public long ride_id;

    @JsonProperty
    public long match_id;
}
