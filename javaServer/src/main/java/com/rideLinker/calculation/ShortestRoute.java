package com.rideLinker.calculation;

public class ShortestRoute {
    private double userStartLatRad;
    private double userStartLonRad;
    private double userEndLatRad;
    private double userEndLonRad;
    private double riderStartLatRad;
    private double riderStartLonRad;
    private double riderEndLatRad;
    private double riderEndLonRad;

    public void setUserStartLatRad(double userStartLatRad) {
        this.userStartLatRad = userStartLatRad;
    }

    public void setUserStartLonRad(double userStartLonRad) {
        this.userStartLonRad = userStartLonRad;
    }

    public void setUserEndLatRad(double userEndLatRad) {
        this.userEndLatRad = userEndLatRad;
    }

    public void setUserEndLonRad(double userEndLonRad) {
        this.userEndLonRad = userEndLonRad;
    }

    public void setRiderStartLatRad(double riderStartLatRad) {
        this.riderStartLatRad = riderStartLatRad;
    }

    public void setRiderStartLonRad(double riderStartLonRad) {
        this.riderStartLonRad = riderStartLonRad;
    }

    public void setRiderEndLatRad(double riderEndLatRad) {
        this.riderEndLatRad = riderEndLatRad;
    }

    public void setRiderEndLonRad(double riderEndLonRad) {
        this.riderEndLonRad = riderEndLonRad;
    }

    public double getShortestRoute() {
        Distance calculatedDistance = new Distance();
        var asbs = calculatedDistance.calculate(userStartLatRad, userStartLonRad, riderStartLatRad, riderStartLonRad);
        var asbe = calculatedDistance.calculate(userStartLatRad, userStartLonRad, riderEndLatRad, riderEndLonRad);
        var asae = calculatedDistance.calculate(userStartLatRad, userStartLonRad, userEndLatRad, userEndLonRad);
        var bsae = calculatedDistance.calculate(riderStartLatRad, riderStartLonRad, userEndLatRad, userEndLonRad);
        var bsbe = calculatedDistance.calculate(riderStartLatRad, riderStartLonRad, riderEndLatRad, riderEndLonRad);
        var aebe = calculatedDistance.calculate(userEndLatRad, userEndLonRad, riderEndLatRad, riderEndLonRad);

        double[] routeData = new double[4];
        routeData[0] = asbs + asae + aebe;
        routeData[1] = asbs + asbe + aebe;
        routeData[2] = asbs + bsae + aebe;
        routeData[3] = asbs + bsbe + aebe;

        double smallestRoute = routeData[0];

        for (int i = 1; i < routeData.length; i++) {
            if (routeData[i] < smallestRoute) {
                smallestRoute = routeData[i];
            }
        }
        return smallestRoute;
    }
}
