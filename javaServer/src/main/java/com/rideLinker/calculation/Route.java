package com.rideLinker.calculation;

import com.rideLinker.dto.DistanceTimeResDTO;
import com.rideLinker.dto.LatLngDTO;
import com.rideLinker.dto.LocationDTO;
import com.rideLinker.entity.LocationEntity;
import com.rideLinker.entity.RideEntity;
import com.rideLinker.entity.SegmentEntity;
import com.rideLinker.service.GoogleDistanceTimeService;

import javax.xml.stream.Location;

public class Route {


    public static RouteCandidate getShortestRoute(SoloRide rideA, SoloRide rideB, RideEntity rideMatchCandidata) {
        final RouteCandidate[] bestCandidate = new RouteCandidate[]{null};
        forEachDistance(rideA, rideB, routeCandidate -> {
            if (bestCandidate[0] == null || routeCandidate.score > bestCandidate[0].score) {
                bestCandidate[0] = routeCandidate;
                RideEntity rideMatch = rideMatchCandidata;
            }
        });
        if (bestCandidate[0].score <= 0) {
            return null;
        }
        //todo return two objects?
        return bestCandidate[0];
    }

    static void forEachDistance(SoloRide rideA, SoloRide rideB, RouteCandidateConsumer f) {
        //new 4 possible route
        RoutePoint aStart = new RoutePoint(Party.A, rideA.startPoint);
        RoutePoint bStart = new RoutePoint(Party.B, rideB.startPoint);
        RoutePoint aEnd = new RoutePoint(Party.A, rideA.endPoint);
        RoutePoint bEnd = new RoutePoint(Party.B, rideB.endPoint);

        f.accept(new RouteCandidate(rideA,rideB,aStart, bStart, aEnd, bEnd));
        f.accept(new RouteCandidate(rideA,rideB,aStart, bStart, bEnd, aEnd));
        f.accept(new RouteCandidate(rideA,rideB,bStart, aStart, aEnd, bEnd));
        f.accept(new RouteCandidate(rideA,rideB,bStart, aStart, bEnd, aEnd));
    }





    public static class RouteCandidate {
        public RouteSegment segment1;
        public RouteSegment segment2;
        public RouteSegment segment3;
        public double score;
        public SoloRide rideA;
        public SoloRide rideB;

        public RouteCandidate(SoloRide rideA, SoloRide rideB,RoutePoint a, RoutePoint b, RoutePoint c, RoutePoint d){
            this.rideA = rideA;
            this.rideB = rideB;

            segment1 = new RouteSegment(a, b);
            segment2 = new RouteSegment(b, c);
            segment3 = new RouteSegment(c, d);
//            aDistance = segment1.aDistance + segment2.aDistance + segment3.aDistance;
//            bDistance = segment1.bDistance + segment2.bDistance + segment3.bDistance;

            double aSaved = rideA.distance - getADistance();
            double bSaved = rideB.distance - getBDistance();
            score = aSaved <= 0 || bSaved <= 0 ? -1 :
                    aSaved * bSaved;
        }

        public double getADistance() {
            return segment1.getADistance() + segment2.getADistance() + segment3.getADistance();
        }

        public double getBDistance() {
            return segment1.getBDistance() + segment2.getBDistance() + segment3.getBDistance();
        }


    }

    public static class RouteSegment {
        public RoutePoint startPoint;
        public RoutePoint endPoint;
        public double distance;
//        public double aDistance;
//        public double bDistance;

        public RouteSegment(RoutePoint startPoint, RoutePoint endPoint) {
            this.startPoint = startPoint;
            this.endPoint = endPoint;
            distance = Distance.calculate(startPoint.position, endPoint.position);
        }

        public double getADistance() {
            if(hasA() && hasB()){
                return distance / 2;
            }
            if (hasA()){
                return  distance;
            }
            return 0;
        }

        public double getBDistance() {
            if(hasA() && hasB()){
                return distance / 2;
            }
            if (hasB()){
                return  distance;
            }
            return 0;
        }

        public boolean hasA () {
            return startPoint.party == Party.A || endPoint.party == Party.A;
        }
        public boolean hasB () {
            return startPoint.party == Party.B || endPoint.party == Party.B;
        }

        public SegmentEntity calcAccurateCost(GoogleDistanceTimeService googleDistanceTimeService) {
            String source = startPoint.position.getLat() + "," + startPoint.position.getLng();
            String dest = endPoint.position.getLat() + "," + endPoint.position.getLng();
            DistanceTimeResDTO distanceDuration = googleDistanceTimeService.getDistanceDuration(source, dest);
            SegmentEntity segmentEntity = new SegmentEntity();
            segmentEntity.setStartLocationId(startPoint.position.getId());
            segmentEntity.setEndLocationId(endPoint.position.getId());
            segmentEntity.setDistanceInMeters(distanceDuration.distanceInMeters);
            segmentEntity.setDurationInSeconds(distanceDuration.durationInSeconds);
            this.distance = distanceDuration.distanceInMeters;
            return segmentEntity;
        }
    }
    public enum Party {
        A,B
    }
    public static class RoutePoint {
        public Party party;
        public LocationEntity position;

        public RoutePoint(Party party, LocationEntity position) {
            this.party = party;
            this.position = position;
        }
    }
    public static class SoloRide {
        public Long id;
        public LocationEntity startPoint;
        public LocationEntity endPoint;
        public double distance;

        public SoloRide(Long id, LocationEntity startPoint, LocationEntity endPoint) {
            this.startPoint = startPoint;
            this.endPoint = endPoint;
            this.id = id;
            distance = Distance.calculate(startPoint,endPoint);
        }
    }

    interface RouteCandidateConsumer {
        void accept(RouteCandidate routeCandidate);
    }
}
