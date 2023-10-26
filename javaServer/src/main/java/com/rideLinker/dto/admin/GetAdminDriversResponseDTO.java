package com.rideLinker.dto.admin;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rideLinker.entity.DriverEntity;

public class GetAdminDriversResponseDTO {
    @JsonProperty("drivers")
    public Iterable<DriverEntity> drivers;
}
