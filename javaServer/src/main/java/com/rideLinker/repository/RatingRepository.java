package com.rideLinker.repository;

import com.rideLinker.entity.RatingEntity;
import com.rideLinker.form.ReviewForm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RatingRepository extends CrudRepository<RatingEntity, Long> {

}
