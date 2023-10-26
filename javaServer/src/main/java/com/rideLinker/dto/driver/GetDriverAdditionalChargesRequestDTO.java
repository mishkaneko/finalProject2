package com.rideLinker.dto.driver;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GetDriverAdditionalChargesRequestDTO {
    @JsonProperty("match_id")
    public long match_id;

}
