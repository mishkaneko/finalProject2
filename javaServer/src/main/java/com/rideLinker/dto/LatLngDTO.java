package com.rideLinker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.postgresql.geometric.PGpoint;

import java.sql.Timestamp;

public class LatLngDTO {
    @JsonProperty("lat")
    public Double lat;
    @JsonProperty("lng")
    public Double lng;

    public static LatLngDTO fromSQL(String point) {
        String[] parts = point.split(",");
        LatLngDTO latLngDTO = new LatLngDTO();
        latLngDTO.lat = Double.parseDouble(parts[0]);
        latLngDTO.lng = Double.parseDouble(parts[1]);
        return latLngDTO;
    }

    public String toSQL() {
        return lat + "," + lng;
    }


}
