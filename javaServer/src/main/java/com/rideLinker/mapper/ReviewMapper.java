package com.rideLinker.mapper;


import com.rideLinker.dto.review.ResponseReviewDTO;
import com.rideLinker.entity.RatingEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ReviewMapper {

    ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

    ResponseReviewDTO toResponseReview(RatingEntity review);
    List<ResponseReviewDTO> toResponseReviews(List<RatingEntity> review);
}
