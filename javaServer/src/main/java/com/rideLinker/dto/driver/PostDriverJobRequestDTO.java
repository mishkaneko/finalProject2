package com.rideLinker.dto.driver;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PostDriverJobRequestDTO {

    @JsonProperty
    public long driver_id;
    @JsonProperty("match_id")
    public long match_id;
}
