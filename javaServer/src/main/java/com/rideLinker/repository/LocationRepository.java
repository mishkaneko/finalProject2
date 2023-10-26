package com.rideLinker.repository;

import com.rideLinker.entity.LocationEntity;
import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository<LocationEntity, Long> {
}
