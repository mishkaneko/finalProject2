package com.rideLinker.dto.driver;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GetDriverAdditionalChargesResponseDTO {
    @JsonProperty("passengerA_name")
    public String passengerA_name;

    @JsonProperty("passengerB_name")
    public String passengerB_name;

}
