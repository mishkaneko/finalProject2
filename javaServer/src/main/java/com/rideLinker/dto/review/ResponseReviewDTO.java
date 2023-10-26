package com.rideLinker.dto.review;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResponseReviewDTO {
    @JsonProperty("match_id")
    public Long matchId;
    @JsonProperty("from_user_id")
    public Long fromUserId;
    @JsonProperty("to_user_id")
    public Long toUserId;
    @JsonProperty("score")
    public Long score;
    @JsonProperty("comment")
    public String comment;
}
