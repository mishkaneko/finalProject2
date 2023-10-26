package com.rideLinker.repository;

import com.rideLinker.dto.match.GetResponseMatchDriveDTO;
import com.rideLinker.entity.MatchEntity;
import com.rideLinker.entity.RideEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;

public interface MatchRepository extends CrudRepository<MatchEntity, Long> {
//
//    @Query(value = "SELECT start_point, waypoint_1, waypoint2, end_point, start_name, waypoint_1_name, waypoint_2_name, end_name from match where driver_id = :driverId")
//    GetResponseMatchDriveDTO getMatchedRoute(Long driverId);

    //Todo
//    @Query(value = "INSERT INTO match (start_point, waypoint_1, way_point_2, end_point, start_name, waypoint_1_name, waypoint_2_name, end_name, total_distance, estimated_fare, match_time)", nativeQuery = true)
        @Query(value = "SELECT arrive_by_time from ride where end_location_id = :endLocationId AND match_id = :matchId", nativeQuery = true)
        Timestamp endpointDropoffTime(@Param("endLocationId") long endLocationId, @Param("matchId") long matchId);

//        @Query(value = "select :endPointDropoffTime - INTERVAL ':totalDurationInSeconds seconds'::interval", nativeQuery = true)
//        Timestamp startpointPickupTime(@Param("endPointDropoffTime")Timestamp endPointDropoffTime, @Param("totalDurationInSeconds")double totalDurationInSeconds);

//    @Query(value = "select ?1 - INTERVAL ?2 * INTERVAL '1 second'", nativeQuery = true)
//    Timestamp startpointPickupTime(Timestamp endPointDropoffTime, double totalDurationInSeconds);

//    @Query(value = "select :startPointPickupTime + INTERVAL ':segment1DurationTimeInSec seconds'")
//    Timestamp wayPointAPickupTime(@Param("startPointPickupTime") Timestamp startPointPickupTime, @Param("segment1DurationTimeInSec") double segment1DurationTimeInSec);
//
//    @Query(value = "select :wayPointAPickupTime + INTERVAL ':segment2DurationTimeInSec seconds'", nativeQuery = true)
//    Timestamp wayPointBPickupTime(@Param("wayPointAPickupTime") Timestamp wayPointAPickupTime, @Param("segment2DurationTimeInSec") double segment2DurationTimeInSec);

}
