package com.rideLinker.dto.driver;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rideLinker.dto.LocationDTO;
import com.rideLinker.dto.ResponseLocationDTO;

public class GetDriverJobResponseDTO {
    @JsonProperty("origin")
    public LocationDTO origin;

    @JsonProperty("waypoint_A")
    public LocationDTO waypoint_A;

    @JsonProperty("waypoint_B")
    public LocationDTO waypoint_B;

    @JsonProperty("endpoint")
    public LocationDTO endpoint;

    @JsonProperty("fare")
    public double fare;

    @JsonProperty("durationInMinus")
    public double durationInMinus;

    @JsonProperty("distance")
    public double distance;
}
