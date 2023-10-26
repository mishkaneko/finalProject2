package com.rideLinker.service;

import com.rideLinker.dto.review.PostRequestReviewDTO;
import com.rideLinker.dto.review.ResponseReviewDTO;
import com.rideLinker.entity.RatingEntity;
import com.rideLinker.form.ReviewForm;
import com.rideLinker.mapper.ReviewMapper;
import com.rideLinker.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;


@Service
@Scope("singleton")
public class ReviewService {
    @Autowired
    RatingRepository ratingRepository;

    public RatingEntity makeReview(PostRequestReviewDTO review) {
        RatingEntity makeReview = new RatingEntity();
        makeReview.setComment(review.comment);
        makeReview.setMatchId(review.match_id);
        makeReview.setScore(review.score);
        makeReview.setFromUserId(review.fromUserId);
        makeReview.setToUserId(review.toUserId);
        return ratingRepository.save(makeReview);
    }

    public ResponseReviewDTO getReviewById(Long userId) {
        var review = ratingRepository.findById(userId);

        if(!review.isPresent())
        {
            return new ResponseReviewDTO();
        }

        return ReviewMapper.INSTANCE.toResponseReview(review.get());
    }
}
