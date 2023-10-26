package com.rideLinker.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
@Table(name = "`ride`")
public class RideEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`passenger_id`", nullable = false)
    private Long passengerId;

    @Column(name = "`match_id`", nullable = true)
    private Long matchId;

    @Column(name = "`start_location_id`", nullable = false)
    private Long startLocationId;

    @Column(name = "`end_location_id`", nullable = false)
    private Long endLocationId;

    @Column(name = "`arrive_by_time`", nullable = false)
    private Timestamp arriveByTime;

    @Column(name = "`transaction_id`", nullable = true)
    private Long transactionId;

    @Column(name = "`saved_fare`", nullable = true)
    private Double savedFare;

    @Column(name = "`distance`", nullable = true)
    private Long distance;

    @Column(name = "`pickup_time`", nullable = true)
    private Timestamp pickupTime;

    @Column(name = "`dropoff_time`", nullable = true)
    private Timestamp dropoffTime;

    @Column(name = "`status`", nullable = false)
    @Enumerated(EnumType.STRING)
    private RideStatus status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(Long passengerId) {
        this.passengerId = passengerId;
    }

    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public Long getStartLocationId() {
        return startLocationId;
    }

    public void setStartLocationId(Long startLocationId) {
        this.startLocationId = startLocationId;
    }

    public Long getEndLocationId() {
        return endLocationId;
    }

    public void setEndLocationId(Long endLocationId) {
        this.endLocationId = endLocationId;
    }

    public Timestamp getArriveByTime() {
        return arriveByTime;
    }

    public void setArriveByTime(Timestamp arriveByTime) {
        this.arriveByTime = arriveByTime;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public Double getSavedFare() {
        return savedFare;
    }

    public void setSavedFare(Double savedFare) {
        this.savedFare = savedFare;
    }

    public Long getDistance() {
        return distance;
    }

    public void setDistance(Long distance) {
        this.distance = distance;
    }

    public Timestamp getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(Timestamp pickupTime) {
        this.pickupTime = pickupTime;
    }

    public Timestamp getDropoffTime() {
        return dropoffTime;
    }

    public void setDropoffTime(Timestamp dropoffTime) {
        this.dropoffTime = dropoffTime;
    }

    public RideStatus getStatus() {
        return status;
    }

    public void setStatus(RideStatus status) {
        this.status = status;
    }
}
