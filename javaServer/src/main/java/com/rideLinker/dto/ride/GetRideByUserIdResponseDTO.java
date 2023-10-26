package com.rideLinker.dto.ride;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rideLinker.entity.RideEntity;

import java.util.List;

public class GetRideByUserIdResponseDTO {
    @JsonProperty("rides")
    public List<RideEntity> rides;
}
