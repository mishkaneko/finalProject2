package com.rideLinker.dto.driver;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GetDriverJobRequestDTO {
    @JsonProperty("match_id")
    public long match_id;
}
