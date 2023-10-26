package com.rideLinker.entity;

import jakarta.persistence.*;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
@Table(name = "`match_ride`")
public class MatchRideEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`match_id`", nullable = false)
    private Long matchId;

    @Column(name = "`ride1_id`", nullable = false)
    private Long ride1Id;

    @Column(name = "`ride2_id`", nullable = false)
    private Long ride2Id;

    @Column(name = "`status`", nullable = false)
    @Enumerated(EnumType.STRING)
    private MatchRideStatus status;

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

    public Long getRide1Id() {
        return ride1Id;
    }

    public void setRide1Id(Long ride1Id) {
        this.ride1Id = ride1Id;
    }

    public Long getRide2Id() {
        return ride2Id;
    }

    public void setRide2Id(Long ride2Id) {
        this.ride2Id = ride2Id;
    }

    public MatchRideStatus getStatus() {
        return status;
    }

    public void setStatus(MatchRideStatus status) {
        this.status = status;
    }
}
