package com.rideLinker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "`rating`")
public class RatingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`match_id`", nullable = false)
    private Long matchId;

    @Column(name = "`from_user_id`", nullable = false)
    private Long fromUserId;

    @Column(name = "`to_user_id`", nullable = false)
    private Long toUserId;

    @Column(name = "`score`", nullable = false)
    private Long score;

    @Column(name = "`comment`", nullable = true)
    private String comment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public Long getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(Long fromUserId) {
        this.fromUserId = fromUserId;
    }

    public Long getToUserId() {
        return toUserId;
    }

    public void setToUserId(Long toUserId) {
        this.toUserId = toUserId;
    }

    public Long getScore() {
        return score;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
