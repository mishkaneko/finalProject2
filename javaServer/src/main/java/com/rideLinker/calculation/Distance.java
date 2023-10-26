package com.rideLinker.calculation;

import com.rideLinker.dto.LatLngDTO;
import com.rideLinker.dto.LocationDTO;
import com.rideLinker.entity.LocationEntity;

public class Distance {

    public static double calculate(LocationEntity a, LocationEntity b) {
        double x = a.getLat() - b.getLat();
        double y = a.getLng() - b.getLng();
        double r2 = x * x + y * y;
        return Math.sqrt(r2);
    }

    public double calculate(double lat1, double lon1, double lat2, double lon2) {
        double dLat = lat2 - lat1;
        double dLon = lon2 - lon1;
        int earthRadiusInKm = 6371;
        return earthRadiusInKm * Math.sqrt(dLat * dLat + dLon * dLon);
    }
}
