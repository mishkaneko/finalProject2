package com.rideLinker.dto.match;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rideLinker.dto.LatLngDTO;

import javax.lang.model.util.Elements;
import java.util.List;

public class GetResponseMatchDriveDTO {
    private LatLngDTO origin;
    private LatLngDTO destination;
    private LatLngDTO[] waypoints;
    private LocationName locationName;

    public LatLngDTO getOrigin() {
        return origin;
    }

    public void setOrigin(LatLngDTO origin) {
        this.origin = origin;
    }

    public LatLngDTO getDestination() {
        return destination;
    }

    public void setDestination(LatLngDTO destination) {
        this.destination = destination;
    }

    public LatLngDTO[] getWaypoints() {
        return waypoints;
    }

    public void setWaypoints(LatLngDTO[] waypoints) {
        this.waypoints = waypoints;
    }

    public LocationName getLocationName() {
        return locationName;
    }

    public void setLocationName(LocationName locationName) {
        this.locationName = locationName;
    }
}
