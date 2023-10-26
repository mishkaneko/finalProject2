package com.rideLinker.repository;

import com.rideLinker.entity.DriverEntity;
import org.springframework.data.repository.CrudRepository;

public interface DriverRepository extends CrudRepository<DriverEntity, Long> {
}
