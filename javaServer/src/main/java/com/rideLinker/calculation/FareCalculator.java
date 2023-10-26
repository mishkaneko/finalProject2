package com.rideLinker.calculation;

public class FareCalculator {
    public static final double priceOfFirst2Km = 27;
    public static final double pricePerEveryKm = 1.9;

    public static double calcFare (double distanceInKm) {
        if (distanceInKm <= 2) {
            return priceOfFirst2Km;
        }
        return priceOfFirst2Km + Math.ceil((distanceInKm - 2)*5) * pricePerEveryKm;
    }
}
