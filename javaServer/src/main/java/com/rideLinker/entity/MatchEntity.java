package com.rideLinker.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "`match`")
public class MatchEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`driver_id`", nullable = true)
    private Long driverId;

    @Column(name = "`segment_1_id`", nullable = false)
    private Long segment1Id;

    @Column(name = "`segment_2_id`", nullable = false)
    private Long segment2Id;

    @Column(name = "`segment_3_id`", nullable = false)
    private Long segment3Id;

    @Column(name = "`total_distance_in_meters`", nullable = false)
    private Double totalDistanceInMeters;

    @Column(name = "`estimated_duration_in_seconds`", nullable = false)
    private Double estimatedDurationInSeconds;

    @Column(name = "`estimated_fare`", nullable = false)
    private Double estimatedFare;

    @Column(name = "`match_time`", nullable = false)
    private Timestamp matchTime;

    @Column(name = "`start_time`", nullable = true)
    private Timestamp startTime;

    @Column(name = "`end_time`", nullable = true)
    private Timestamp endTime;

    @Column(name = "`confirm_time`", nullable = true)
    private Timestamp confirmTime;

    @Column(name = "`reject_time`", nullable = true)
    private Timestamp rejectTime;

    @Column(name = "`cancel_time`", nullable = true)
    private Timestamp cancelTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public Long getSegment1Id() {
        return segment1Id;
    }

    public void setSegment1Id(Long segment1Id) {
        this.segment1Id = segment1Id;
    }

    public Long getSegment2Id() {
        return segment2Id;
    }

    public void setSegment2Id(Long segment2Id) {
        this.segment2Id = segment2Id;
    }

    public Long getSegment3Id() {
        return segment3Id;
    }

    public void setSegment3Id(Long segment3Id) {
        this.segment3Id = segment3Id;
    }

    public Double getTotalDistanceInMeters() {
        return totalDistanceInMeters;
    }

    public void setTotalDistanceInMeters(Double totalDistanceInMeters) {
        this.totalDistanceInMeters = totalDistanceInMeters;
    }

    public Double getEstimatedDurationInSeconds() {
        return estimatedDurationInSeconds;
    }

    public void setEstimatedDurationInSeconds(Double estimatedDurationInSeconds) {
        this.estimatedDurationInSeconds = estimatedDurationInSeconds;
    }

    public Double getEstimatedFare() {
        return estimatedFare;
    }

    public void setEstimatedFare(Double estimatedFare) {
        this.estimatedFare = estimatedFare;
    }

    public Timestamp getMatchTime() {
        return matchTime;
    }

    public void setMatchTime(Timestamp matchTime) {
        this.matchTime = matchTime;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public Timestamp getConfirmTime() {
        return confirmTime;
    }

    public void setConfirmTime(Timestamp confirmTime) {
        this.confirmTime = confirmTime;
    }

    public Timestamp getRejectTime() {
        return rejectTime;
    }

    public void setRejectTime(Timestamp rejectTime) {
        this.rejectTime = rejectTime;
    }

    public Timestamp getCancelTime() {
        return cancelTime;
    }

    public void setCancelTime(Timestamp cancelTime) {
        this.cancelTime = cancelTime;
    }
}
