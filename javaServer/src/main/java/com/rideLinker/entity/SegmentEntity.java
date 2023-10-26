package com.rideLinker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "`segment`")
public class SegmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`start_location_id`", nullable = false)
    private Long startLocationId;

    @Column(name = "`end_location_id`", nullable = false)
    private Long endLocationId;

    @Column(name = "`distance_in_meters`", nullable = false)
    private Double distanceInMeters;

    @Column(name = "`duration_in_seconds`", nullable = false)
    private Double durationInSeconds;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Double getDistanceInMeters() {
        return distanceInMeters;
    }

    public void setDistanceInMeters(Double distanceInMeters) {
        this.distanceInMeters = distanceInMeters;
    }

    public Double getDurationInSeconds() {
        return durationInSeconds;
    }

    public void setDurationInSeconds(Double durationInSeconds) {
        this.durationInSeconds = durationInSeconds;
    }
}
