package com.rideLinker.repository;

import com.rideLinker.entity.MatchRideEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MatchRideRepository extends CrudRepository<MatchRideEntity, Long> {

    @Query(value = "select id from match_ride where ride1_id = :ride1_id AND ride2_id = :ride2_id", nativeQuery = true)
    Optional<Long> checkIfMatched(@Param("ride1_id")long ride1_id, @Param("ride2_id")long ride2_id);

    @Query(value = "select * from match_ride where match_id = :match_id", nativeQuery = true)
    MatchRideEntity findAB(@Param("match_id")long match_id);

}
