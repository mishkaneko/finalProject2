package com.rideLinker.controller;


import com.rideLinker.dto.review.PostRequestReviewDTO;
import com.rideLinker.dto.review.ResponseReviewDTO;
import com.rideLinker.entity.RatingEntity;
import com.rideLinker.form.ReviewForm;
import com.rideLinker.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReviewController {

    @Autowired
    ReviewService reviewService;


//    @RequestMapping(value="/passenger/review/{id}", method = RequestMethod.GET)

    @RequestMapping(value="/passenger/review", method = RequestMethod.POST)
    public RatingEntity makeReview(@RequestBody PostRequestReviewDTO review){
        return this.reviewService.makeReview(review);
        }

    @RequestMapping(value="/passenger/review/{userId}", method = RequestMethod.GET)
    public ResponseReviewDTO getReviewById(@PathVariable String userId){
        return this.reviewService.getReviewById(Long.parseLong(userId));
    }




}
