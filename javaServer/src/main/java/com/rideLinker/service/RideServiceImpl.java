package com.rideLinker.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.maps.GeolocationApi;
import com.rideLinker.calculation.FareCalculator;
import com.rideLinker.calculation.Route;
import com.rideLinker.dto.GetMatchResponseDTO;
import com.rideLinker.dto.ResponseLocationDTO;
import com.rideLinker.dto.driver.GetDriverAdditionalChargesResponseDTO;
import com.rideLinker.dto.ride.*;
import com.rideLinker.entity.*;
import com.rideLinker.mapper.LocationMapper;
import com.rideLinker.mapper.MapperUtils;
import com.rideLinker.repository.*;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.origin.Origin;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Duration;
import java.util.Optional;
import java.util.TooManyListenersException;

@Service
@Scope("singleton")
@Transactional
public class RideServiceImpl implements RideService {


    @Autowired
    RideCrudRepo rideCrudRepo;

    @Autowired
    RideRepository rideRepository;

    @Autowired
    MatchRepository matchRepository;


    @Autowired
    GoogleDistanceTimeService googleDistanceTimeService;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    SegmentRepository segmentRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    MatchRideRepository matchRideRepository;


    @Autowired
    NotificationService notificationService;

    public PostRidePlanResponseDTO postRidePlan(PostRidePlanRequestDTO postRidePlanRequestDTO) {

//        googleDistanceTimeService.test();
        //todo 呢個位就係 call 個 socket io
        notificationService.test();

        Long userId = postRidePlanRequestDTO.userId;
        //todo
        RideEntity rideEntity = new RideEntity();

        LocationEntity startLocation = LocationMapper.toEntity(postRidePlanRequestDTO.startPoint);
        startLocation = locationRepository.save(startLocation);

        LocationEntity endLocation = LocationMapper.toEntity(postRidePlanRequestDTO.endPoint);
        endLocation = locationRepository.save(endLocation);

        rideEntity.setPassengerId(userId);
        rideEntity.setStartLocationId(startLocation.getId());
        rideEntity.setEndLocationId(endLocation.getId());
        //todo 佢未 get 得切？
        rideEntity.setArriveByTime(postRidePlanRequestDTO.arriveByTime);
        rideEntity.setStatus(RideStatus.available);
        rideEntity = rideCrudRepo.save(rideEntity);

        Route.RouteCandidate bestRoute = null;
        Timestamp arrive_by_time = rideEntity.getArriveByTime();
        Route.SoloRide rideA = new Route.SoloRide(rideEntity.getId(), startLocation, endLocation);


        //todo 呢到出黎嘅人 應該係 within an hour, availabe and didnt match before,

//        matchRideRepository.findById()

        //todo 有 match id 有 ride id 就唔比佢係到再 match
        for (RideEntity rideMatchCandidate : rideCrudRepo.getRideMatchCandidates(userId, arrive_by_time)) {

            //todo select match_ride here 如果有 ride 1 有 ride 2 而係 cancel 嘅 就 continues
            if(rideEntity.getId()>rideMatchCandidate.getId()){
                long ride2_id = rideEntity.getId();
                long ride1_id = rideMatchCandidate.getId();
            }
            long ride1_id = rideEntity.getId();
            long ride2_id = rideMatchCandidate.getId();

            Optional<Long> ifmatched = matchRideRepository.checkIfMatched(ride1_id, ride2_id);

            if(ifmatched.isPresent()){
                continue;
            }

            Route.SoloRide rideB = new Route.SoloRide(
                    rideMatchCandidate.getId(), //this is rideid
                    locationRepository.findById(rideMatchCandidate.getStartLocationId()).orElseThrow(),
                    locationRepository.findById(rideMatchCandidate.getEndLocationId()).orElseThrow());

            Route.RouteCandidate route = Route.getShortestRoute(rideA, rideB, rideMatchCandidate);

            if (route == null) {
                continue;
            }

            System.out.println("compare, distance:" + route.score);

            if (bestRoute == null || bestRoute.score < route.score) {
                bestRoute = route;
            }


        }
        PostRidePlanResponseDTO result = new PostRidePlanResponseDTO();

        if (bestRoute == null) {
            result.error = "no suitable ride match";
            return result;
        }

        result.matched = "invitation";
//        bestRoute.rideB.id

        MatchEntity matchEntity = new MatchEntity();

        //set the segment
        SegmentEntity segment1Entity = bestRoute.segment1.calcAccurateCost(googleDistanceTimeService);
        segment1Entity = segmentRepository.save(segment1Entity);
        matchEntity.setSegment1Id(segment1Entity.getId());

        SegmentEntity segment2Entity = bestRoute.segment2.calcAccurateCost(googleDistanceTimeService);
        segment2Entity = segmentRepository.save(segment2Entity);
        matchEntity.setSegment2Id(segment2Entity.getId());

        SegmentEntity segment3Entity = bestRoute.segment3.calcAccurateCost(googleDistanceTimeService);
        segment3Entity = segmentRepository.save(segment3Entity);
        matchEntity.setSegment3Id(segment3Entity.getId());


        double totalDistance = segment1Entity.getDistanceInMeters() + segment2Entity.getDistanceInMeters() + segment3Entity.getDistanceInMeters();
        matchEntity.setTotalDistanceInMeters(totalDistance);

        double totalFee = FareCalculator.calcFare(totalDistance/1000);
        matchEntity.setEstimatedFare(totalFee);
        matchEntity.setMatchTime(new Timestamp(System.currentTimeMillis()));




        double aMatchedDistanceInKm = bestRoute.getADistance();
        System.out.println(aMatchedDistanceInKm);
        double aMatchedFare = totalFee * aMatchedDistanceInKm / totalDistance;
        TransactionEntity aTransaction = new TransactionEntity();
        aTransaction.setPassengerId(rideRepository.findById(bestRoute.rideA.id).orElseThrow().getPassengerId());
        aTransaction.setAmount(aMatchedFare);
        TransactionEntity aInsertedTransaction = transactionRepository.save(aTransaction);
        //todo now a distance and b distance has the same value;

        double bMatchedDistanceInKm = bestRoute.getBDistance();
        System.out.println(bMatchedDistanceInKm);
        double bMatchedFare = totalFee * bMatchedDistanceInKm / totalDistance;

        TransactionEntity bTransaction = new TransactionEntity();
        bTransaction.setPassengerId(rideRepository.findById(bestRoute.rideB.id).orElseThrow().getPassengerId());
        bTransaction.setAmount(bMatchedFare);
        TransactionEntity bInsertedTransaction = transactionRepository.save(bTransaction);

        //todo this should be the ride A's start and end position(original)
        double aSoloDistanceInKm = googleDistanceTimeService.getDistanceDuration(postRidePlanRequestDTO.startPoint, postRidePlanRequestDTO.endPoint).distanceInMeters;
        double aSoloFare = FareCalculator.calcFare(aSoloDistanceInKm/1000);


        double bSoloDistanceInKm = googleDistanceTimeService.getDistanceDuration(LocationMapper.toDTO(bestRoute.rideB.startPoint), LocationMapper.toDTO(bestRoute.rideB.endPoint)).distanceInMeters;
        double bSoloFare = FareCalculator.calcFare(bSoloDistanceInKm)/1000;




        //todo transfer it to second?
        Double totalDurationInSeconds = segment1Entity.getDurationInSeconds() + segment2Entity.getDurationInSeconds() + segment3Entity.getDurationInSeconds();
        matchEntity.setEstimatedDurationInSeconds(totalDurationInSeconds);
        matchEntity = matchRepository.save(matchEntity);

        //todo save 完呢個 ride 之後 我都要 save 低 match id 比 B
            RideEntity rideB = rideCrudRepo.findById(bestRoute.rideB.id).orElseThrow();
            rideB.setMatchId(matchEntity.getId());
            //todo set transaction id
            rideB.setTransactionId(bTransaction.getId());
            rideB = rideCrudRepo.save(rideB);

            rideEntity.setTransactionId(aTransaction.getId());
            rideEntity = rideCrudRepo.save(rideB);
        //todo save 低佢地曾經match過 落 matchride
        MatchRideEntity matchRideEntity = new MatchRideEntity();

        if(bestRoute.rideB.id > rideEntity.getId()){
            matchRideEntity.setRide1Id(rideEntity.getId());
            matchRideEntity.setRide2Id(bestRoute.rideB.id);
        }
        matchRideEntity.setMatchId(matchEntity.getId());
        matchRideEntity.setRide1Id(bestRoute.rideB.id);
        matchRideEntity.setRide2Id(rideEntity.getId());
        matchRideEntity.setStatus(MatchRideStatus.wait_both);
        matchRideRepository.save(matchRideEntity);




        //todo return a response match
//        PostRidePlanResponseDTO getMatchResponseDTO = new PostRidePlanResponseDTO();
//        getMatchResponseDTO.setRide_id(rideEntity.getId());
//        getMatchResponseDTO.setMatch_id(matchEntity.getId());
        //todo I need to take 對方 id
//        getMatchResponseDTO.setPassenger_id(bestRoute.rideB.id);
//        CustomerEntity otherCustomer = customerRepository.findById(bestRoute.rideB.id).orElseThrow();
//        getMatchResponseDTO.setPassenger_name(otherCustomer.getName());
//        LocationEntity currentUserStartLocationEntity = locationRepository.findById(rideEntity.getStartLocationId()).orElseThrow();
//        getMatchResponseDTO.setPick_up_location_name(currentUserStartLocationEntity.getName());
//        LocationEntity currentUserEndLocationEntity = locationRepository.findById(rideEntity.getEndLocationId()).orElseThrow();
//        getMatchResponseDTO.setDrop_off_location_name(currentUserEndLocationEntity.getName());
//        getMatchResponseDTO.setUser_fare(aMatchedFare);
//        getMatchResponseDTO.setUser_saved_amount(aSoloFare - aMatchedFare);
        // todo I got all the time here
        //todo to calculate time, I first need to take the last location's dropoff time, ride's arrve_by_time.
        //todo to know the dropoff time, I need to find the ride by knowing the drop off location id + matchid
        //todo there is no match id...
//        long endLocationId = bestRoute.segment3.endPoint.position.getId();
//        long endTime =  rideCrudRepo.endpointDropoffTime(endLocationId, matchEntity.getId()).getTime();
        //todo parseit to milisecon and do logic
        //todo, I got duration, I can get the interval, knowing the start time
//        long startTime = endTime - Double.valueOf(totalDurationInSeconds).longValue() * 1000;
        //todo I also got each segment's time, so I can get every point's time
//        long wayPointATime = startTime + Double.valueOf(segment1Entity.getDurationInSeconds()).longValue() * 1000;
//        Timestamp wayPointATime = matchRepository.wayPointAPickupTime(startPointPickupTime, segment1Entity.getDurationInSeconds());

//        long wayPointBTime = wayPointATime + Double.valueOf(segment2Entity.getDurationInSeconds()).longValue() * 1000;
//        Timestamp wayPointBTime = matchRepository.wayPointBPickupTime(wayPointATime, segment2Entity.getDurationInSeconds());

//        Timestamp endPointDropoffTime = new Timestamp(endTime);
//        Timestamp startPointPickupTime = new Timestamp(startTime);
//
//        Timestamp wayPointAPickupTime = new Timestamp(wayPointATime);
//        Timestamp wayPointBDropOffTime = new Timestamp(wayPointBTime);
//
//        ResponseLocationDTO origin = new ResponseLocationDTO();
//        ResponseLocationDTO waypoint_B = new ResponseLocationDTO();
//        ResponseLocationDTO endpoint = new ResponseLocationDTO();
//
//        origin.name = bestRoute.segment1.startPoint.position.getName();
//        origin.lat = bestRoute.segment1.startPoint.position.getLat();
//        origin.lng = bestRoute.segment1.startPoint.position.getLng();
//        origin.arrive_time = startPointPickupTime;
//        getMatchResponseDTO.setOrigin(origin);
//
//        ResponseLocationDTO waypoint_A = new ResponseLocationDTO();
//        MapperUtils.copy(bestRoute.segment1.endPoint.position, waypoint_A);
//        waypoint_A.name = bestRoute.segment1.endPoint.position.getName();
//        waypoint_A.lat = bestRoute.segment1.endPoint.position.getLat();
//        waypoint_A.lng = bestRoute.segment1.endPoint.position.getLng();
//        waypoint_A.arrive_time = wayPointAPickupTime;
//        getMatchResponseDTO.waypoint_A = (waypoint_A);
//
//
//        waypoint_B.name = bestRoute.segment3.startPoint.position.getName();
//        waypoint_B.lat = bestRoute.segment3.startPoint.position.getLat();
//        waypoint_B.lng = bestRoute.segment3.startPoint.position.getLng();
//        waypoint_B.arrive_time = wayPointBDropOffTime;
//        getMatchResponseDTO.setWaypoint_B(waypoint_B);
//
//        endpoint.name = bestRoute.segment3.endPoint.position.getName();
//        endpoint.lat = bestRoute.segment3.endPoint.position.getLat();
//        endpoint.lng = bestRoute.segment3.endPoint.position.getLng();
//        System.out.println(endpoint.name);
//        System.out.println(endpoint.lat);
//        System.out.println(endpoint.lng);
//
//        endpoint.arrive_time = endPointDropoffTime;
//        getMatchResponseDTO.setEndpoint(endpoint);

                //todo to match the pick up and drop off time for the correct user;
//        if(bestRoute.segment1.startPoint.party == Route.Party.A){
//            rideEntity.setPickupTime(startPointPickupTime);
//            rideEntity = rideCrudRepo.save(rideEntity);
//            getMatchResponseDTO.setEstimated_pickup_time(startPointPickupTime);
//            rideB = rideCrudRepo.selectRideB(bestRoute.rideB.id, matchEntity.getId());
//            rideB.setPickupTime(wayPointAPickupTime);
//            rideB = rideCrudRepo.save(rideB);
//        }
//
//        rideB = rideCrudRepo.selectRideB(bestRoute.rideB.id, matchEntity.getId());
//        rideB.setPickupTime(startPointPickupTime);
//        rideB = rideCrudRepo.save(rideB);
//        rideEntity.setPickupTime(wayPointAPickupTime);
//        rideEntity = rideCrudRepo.save(rideEntity);
//        getMatchResponseDTO.setEstimated_pickup_time(wayPointAPickupTime);
//
//        if(bestRoute.segment3.endPoint.party == Route.Party.A){
//            rideEntity.setDropoffTime(endPointDropoffTime);
//            rideEntity = rideCrudRepo.save(rideEntity);
//            getMatchResponseDTO.setEstimated_drop_off_time(endPointDropoffTime);
//            rideB.setDropoffTime(wayPointBDropOffTime);
//            rideB = rideCrudRepo.save(rideB);
//        }
//        rideB.setDropoffTime(endPointDropoffTime);
//        rideB = rideCrudRepo.save(rideB);
//
//        rideEntity.setDropoffTime(wayPointBDropOffTime);
//        rideEntity = rideCrudRepo.save(rideEntity);
//        getMatchResponseDTO.setEstimated_drop_off_time(wayPointBDropOffTime);



//       result.matchedRide = Route.RouteCandidate;
        return result;
    }

    @Override
    public GetRideByUserIdResponseDTO getRideByUserId(Long userId, GetRideByUserIdRequestDTO getRideByUserIdRequestDTO) {
        GetRideByUserIdResponseDTO result = new GetRideByUserIdResponseDTO();
        result.rides = rideCrudRepo.findAllByPassengerId(userId);
        return result;
    }

    @Override
    public PostRideRejectByRideIdResponseDTO postRideRejectByRideId(Long rideId, PostRideRejectByRideIdRequestDTO postRideRejectByRideIdRequestDTO) {
        RideEntity rideEntity = rideRepository.findById(rideId).orElseThrow();

        if (rideEntity.getMatchId() != null) {
            MatchEntity matchEntity = matchRepository.findById(rideEntity.getMatchId()).orElseThrow();
            matchEntity.setRejectTime(new Timestamp(System.currentTimeMillis()));
            matchRepository.save(matchEntity);
//            rideRepository.setAvailableByMatchId(matchEntity.getId());

            for (RideEntity eachRideEntity : rideRepository.findAllRideByMatchId(matchEntity.getId())) {
                if (!eachRideEntity.getId().equals(rideId)) {
                    eachRideEntity.setStatus(RideStatus.available);
                    eachRideEntity.setMatchId(null);
                    rideRepository.save(eachRideEntity);
                }
            }
        }

        return new PostRideRejectByRideIdResponseDTO();
    }

    @Override
    public PostRideCancelByRideIdResponseDTO postRideCancelByRideId(Long rideId, PostRideCancelByRideIdRequestDTO postRideCancelByRideIdRequestDTO) {
        RideEntity rideEntity = rideRepository.findById(rideId).orElseThrow();

        rideEntity.setStatus(RideStatus.canceled);
        rideRepository.save(rideEntity);

        if (rideEntity.getMatchId() != null) {
            MatchEntity matchEntity = matchRepository.findById(rideEntity.getMatchId()).orElseThrow();
            matchEntity.setCancelTime(new Timestamp(System.currentTimeMillis()));
            matchRepository.save(matchEntity);

            for (RideEntity eachRideEntity : rideRepository.findAllRideByMatchId(matchEntity.getId())) {
                if (!eachRideEntity.getId().equals(rideId)) {
                    eachRideEntity.setStatus(RideStatus.available);
                }
                eachRideEntity.setMatchId(null);
                rideRepository.save(eachRideEntity);
            }
        }


        return new PostRideCancelByRideIdResponseDTO();
    }

    @Override
    public PostRideMatchRejectionResponseDTO postRideMatchRejection(PostRideMatchRejectionRequestDTO requestDTO) {
        RideEntity rideEntity = rideRepository.findById(requestDTO.ride_id).orElseThrow();

        if (rideEntity.getMatchId() != null) {
            MatchEntity matchEntity = matchRepository.findById(rideEntity.getMatchId()).orElseThrow();
            matchEntity.setRejectTime(new Timestamp(System.currentTimeMillis()));
            matchRepository.save(matchEntity);
//            rideRepository.setAvailableByMatchId(matchEntity.getId());

            for (RideEntity eachRideEntity : rideRepository.findAllRideByMatchId(matchEntity.getId())) {
                if (!eachRideEntity.getId().equals(requestDTO.ride_id)) {
                    eachRideEntity.setStatus(RideStatus.available);
                    eachRideEntity.setMatchId(null);
                    rideRepository.save(eachRideEntity);
                }
            }
        }

        return null;
    }

    @Override
    public PostRideMatchCancellationResponseDTO postRideMatchCancellation(PostRideMatchCancellationRequestDTO requestDTO) {
        MatchRideEntity matchRideEntity = matchRideRepository.findAB(requestDTO.match_id);

        MatchEntity matchEntity = matchRepository.findById(requestDTO.ride_id).orElseThrow();
        matchEntity.setRejectTime(new Timestamp(System.currentTimeMillis()));
        matchRepository.save(matchEntity);


        RideEntity rideA = rideRepository.findById(matchRideEntity.getRide1Id()).orElseThrow();
        RideEntity rideB = rideRepository.findById(matchRideEntity.getRide2Id()).orElseThrow();

        rideA.setStatus(RideStatus.canceled);
        rideB.setStatus(RideStatus.canceled);

        rideRepository.save(rideA);
        rideRepository.save(rideB);

        TransactionEntity aTransaction = transactionRepository.findById(rideA.getTransactionId()).orElseThrow();
        aTransaction.setPassengerCancelTime(new Timestamp(System.currentTimeMillis()));
        transactionRepository.save(aTransaction);

        TransactionEntity bTransaction = transactionRepository.findById(rideB.getTransactionId()).orElseThrow();
        bTransaction.setPassengerCancelTime(new Timestamp(System.currentTimeMillis()));
        transactionRepository.save(bTransaction);

        //todo i need to find the fking rideB

        return null;
    }

    @Override
    public PostRideCancellationResponseDTO postRideCancellation(PostRideCancellationRequestDTO requestDTO) {
        RideEntity rideEntity = rideCrudRepo.findById(requestDTO.ride_id).orElseThrow();
        rideEntity.setStatus(RideStatus.canceled);
        rideCrudRepo.save(rideEntity);
        return null;
    }

    @Override
    public GetRideMatchResponseDTO getRideMatch(GetRideMatchRequestDTO requestDTO) {
        GetMatchResponseDTO getMatchResponseDTO = new GetMatchResponseDTO();
        return null;
    }


//    public GetRideByUserIdResponseDTO getRideByUserId(Long userId) {
//        GetRideByUserIdResponseDTO result = new GetRideByUserIdResponseDTO();
//        result.rides = rideCrudRepo.findById(userId);
//        return result;
//    }
}
