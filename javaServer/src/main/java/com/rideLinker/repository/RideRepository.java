package com.rideLinker.repository;

import com.rideLinker.entity.RideEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RideRepository extends CrudRepository<RideEntity, Long> {
    Iterable<RideEntity> findAllRideByMatchId(Long matchId);

//    @Query("update ride set status = 'available', match_id = null where match_id = :matchId")
//    void setAvailableByMatchId(Long matchId);
}
