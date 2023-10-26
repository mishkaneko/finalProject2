package com.rideLinker.service;

import com.rideLinker.dto.driver.*;
import com.rideLinker.entity.*;
import com.rideLinker.mapper.LocationMapper;
import com.rideLinker.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class DriverServiceImpl implements DriverService {
    @Autowired
    DriverRepository driverRepository;

    @Autowired
    MatchRepository matchRepository;

    @Autowired
    RideRepository rideRepository;

    @Autowired
    SegmentRepository segmentRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    MatchRideRepository matchRideRepository;

    @Autowired
    CustomerRepository customerRepository;

//  @Override
//  public PostDriverJobGuideStartResponseDTO postDriverJobGuideStart(PostDriverJobGuideStartResponseDTO postDriverJobGuideStartResponseDTO) {
//   MatchEntity matchEntity = matchRepository.findById(postDriverJobGuideStartResponseDTO.match_id).orElseThrow();
//   matchEntity.setStartTime(new Timestamp(System.currentTimeMillis()));
//   matchRepository.save(matchEntity);
//   RideEntity rideEntity = rideRepository.findById(postDriverJobGuideStartResponseDTO.ride_id).orElseThrow();
//   rideEntity.setPickupTime(new Timestamp(System.currentTimeMillis()));
//   rideRepository.save(rideEntity);
//   return null;
//  }

    @Override
    public PostDriverJobGuideStartResponseDTO postDriverJobGuideStart(PostDriverJobGuideStartResponseDTO postDriverJobGuideStartResponseDTO) {
        MatchEntity matchEntity = matchRepository.findById(postDriverJobGuideStartResponseDTO.match_id).orElseThrow();
        matchEntity.setStartTime(new Timestamp(System.currentTimeMillis()));
        matchRepository.save(matchEntity);
        RideEntity rideEntity = rideRepository.findById(postDriverJobGuideStartResponseDTO.ride_id).orElseThrow();
        rideEntity.setPickupTime(new Timestamp(System.currentTimeMillis()));
        rideRepository.save(rideEntity);
        return null;
    }

    @Override
    public GetDriverJobResponseDTO getDriverJob(GetDriverJobRequestDTO requestDTO) {
        System.out.println(requestDTO.match_id);
        MatchEntity matchEntity = matchRepository.findById(requestDTO.match_id).orElseThrow();
        //todo take the segnment 1, 3 id first
        SegmentEntity segment1 = segmentRepository.findById(matchEntity.getSegment1Id()).orElseThrow();
        SegmentEntity segment3 = segmentRepository.findById(matchEntity.getSegment3Id()).orElseThrow();
        //todo now I have start location id and end location id
        //segnment 1 start
        LocationEntity locationOrigin = locationRepository.findById(segment1.getStartLocationId()).orElseThrow();
        //segment 1 end = seg 2 start
        LocationEntity locationWaypoint_A = locationRepository.findById(segment1.getEndLocationId()).orElseThrow();
        LocationEntity locationWaypoint_B = locationRepository.findById(segment3.getStartLocationId()).orElseThrow();
        LocationEntity locationEndpoint = locationRepository.findById(segment3.getEndLocationId()).orElseThrow();


        GetDriverJobResponseDTO getDriverJobResponseDTO = new GetDriverJobResponseDTO();

        getDriverJobResponseDTO.origin = LocationMapper.toDTO(locationOrigin);
        getDriverJobResponseDTO.endpoint = LocationMapper.toDTO(locationEndpoint);
        getDriverJobResponseDTO.waypoint_A = LocationMapper.toDTO(locationWaypoint_A);
        getDriverJobResponseDTO.waypoint_B = LocationMapper.toDTO(locationWaypoint_B);

        getDriverJobResponseDTO.distance = (matchEntity.getTotalDistanceInMeters());
        getDriverJobResponseDTO.durationInMinus = (matchEntity.getEstimatedDurationInSeconds() * 60);
        getDriverJobResponseDTO.fare = (matchEntity.getEstimatedFare());

        return getDriverJobResponseDTO;
    }

    @Override
    public GetDriverAdditionalChargesResponseDTO getDriverAdditionalCharges(GetDriverAdditionalChargesRequestDTO requestDTO) {
        //todo I get the ride A and ride B id here
        MatchRideEntity matchRideEntity = matchRideRepository.findById(requestDTO.match_id).orElseThrow();
        matchRideEntity.getRide1Id();
        matchRideEntity.getRide2Id();

        RideEntity rideA = rideRepository.findById(matchRideEntity.getRide1Id()).orElseThrow();
        RideEntity rideB = rideRepository.findById(matchRideEntity.getRide2Id()).orElseThrow();

        CustomerEntity rideAName = customerRepository.findById(rideA.getPassengerId()).orElseThrow();
        CustomerEntity rideBName = customerRepository.findById(rideB.getPassengerId()).orElseThrow();

        GetDriverAdditionalChargesResponseDTO getDriverAdditionalChargesResponseDTO = new GetDriverAdditionalChargesResponseDTO();
        getDriverAdditionalChargesResponseDTO.passengerA_name = rideAName.getName();
        getDriverAdditionalChargesResponseDTO.passengerB_name = rideBName.getName();

        return getDriverAdditionalChargesResponseDTO;
    }

    @Override
    public PostDriverJobGuideWaypointAResponseDTO postDriverJobGuideWaypointA(PostDriverJobGuideWaypointARequestDTO requestDTO) {
        RideEntity rideEntity = rideRepository.findById(requestDTO.ride_id).orElseThrow();
        rideEntity.setPickupTime(new Timestamp(System.currentTimeMillis()));
        rideRepository.save(rideEntity);
        return null;
    }

    @Override
    public PostDriverJobGuideWaypointBResponseDTO postDriverJobGuideWaypointB(PostDriverJobGuideWaypointBRequestDTO requestDTO) {
        RideEntity rideEntity = rideRepository.findById(requestDTO.ride_id).orElseThrow();
        rideEntity.setDropoffTime(new Timestamp(System.currentTimeMillis()));
        rideRepository.save(rideEntity);
        return null;
    }

    @Override
    public PostDriverJobGuideCompletedResponseDTO postDriverJobGuideCompleted(PostDriverJobGuideCompletedRequestDTO requestDTO) {
        RideEntity rideEntity = rideRepository.findById(requestDTO.ride_id).orElseThrow();
        rideEntity.setDropoffTime(new Timestamp(System.currentTimeMillis()));
        rideRepository.save(rideEntity);

        MatchEntity matchEntity = matchRepository.findById(requestDTO.match_id).orElseThrow();
        matchEntity.setEndTime(new Timestamp(System.currentTimeMillis()));
        matchRepository.save(matchEntity);
        return null;
    }

    @Override
    public PostDriverJobResponseDTO postDriverJob(PostDriverJobRequestDTO postDriverJobRequestDTO) {
        //todo 我比埋個 match id
        MatchEntity matchEntity = matchRepository.findById(postDriverJobRequestDTO.match_id).orElseThrow();
        matchEntity.setDriverId(postDriverJobRequestDTO.driver_id);
        matchRepository.save(matchEntity);
        return null;
    }

    @Override
    public PostDriverJobGuideStartResponseDTO postDriverJobGuideStart(PostDriverJobGuideStartRequestDTO requestDTO) {
        MatchEntity matchEntity = matchRepository.findById(requestDTO.match_id).orElseThrow();
        matchEntity.setStartTime(new Timestamp(System.currentTimeMillis()));
        matchRepository.save(matchEntity);
        RideEntity rideEntity = rideRepository.findById(requestDTO.ride_id).orElseThrow();
        rideEntity.setPickupTime(new Timestamp(System.currentTimeMillis()));
        rideRepository.save(rideEntity);
        return null;
    }

//    @Override
//    public PostDriverJobResponseDTO postDriverJob(Long driverId) {
//        return null;
//    }
}
