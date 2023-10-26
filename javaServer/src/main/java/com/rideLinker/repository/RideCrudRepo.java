package com.rideLinker.repository;

import com.rideLinker.dto.ride.GetRideByUserIdResponseDTO;
import com.rideLinker.entity.RideEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface RideCrudRepo extends CrudRepository<RideEntity, Long> {
    // TODO check within a hour

    @Query(value = "SELECT * From ride WHERE passenger_id != :user_id AND arrive_by_time BETWEEN CAST(:arrive_by_time AS TIMESTAMP) - INTERVAL '1hour' AND CAST(:arrive_by_time AS TIMESTAMP) + INTERVAL '1hour'", nativeQuery = true)
    List<RideEntity> getRideMatchCandidates(@Param("user_id") Long userId, @Param("arrive_by_time")Timestamp arrive_by_time);

    @Query(value = "SELECT * from ride WHERE passenger_id = :user_id", nativeQuery = true)
   RideEntity getRideInformation(@Param("user_id") Long userId);

    List<RideEntity> findAllByPassengerId(Long passengerId);

//    @Modifying
    @Query(value = "update ride set match_status= :updateMatchingStatus where passenger_id = :userId", nativeQuery = true)
   void updateMatchStatus(String updateMatchingStatus, Long userId);

//    @Modifying
    @Query(value = "update match set reject_time=current_timestamp where id = :id", nativeQuery = true)
    void updateRejectTimeStamp(Long id);

    @Query(value = "update match set cancel_time=current_timestamp where id = :id", nativeQuery = true)
    void updateCancelTimeStamp(Long id);

    @Query(value = "select * from ride where passenger_id = :passenger_id AND match_id = :match_id", nativeQuery = true)
    RideEntity selectRideB (@Param("passenger_id")long passenger_id, @Param("match_id")long match_id);

    @Query(value = "SELECT arrive_by_time from ride where end_location_id = :endLocationId AND match_id = :matchId", nativeQuery = true)
    Timestamp endpointDropoffTime(@Param("endLocationId") long endLocationId, @Param("matchId") long matchId);


    // TODO
    // @Query("UPDATE")
    // void saveMatch(@Param("a_ride_id") int aRideId, @Param("b_ride_id") int
    // bRideId);
}
