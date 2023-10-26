package com.rideLinker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;

public class GetMatchResponseDTO {

    //todo change the LocationDto
    @JsonProperty("origin")
    public ResponseLocationDTO origin;

    @JsonProperty("endpoint")
    public ResponseLocationDTO endpoint;

    @JsonProperty("waypoint_A")
    public ResponseLocationDTO waypoint_A;

    @JsonProperty("waypoint_B")
    public ResponseLocationDTO waypoint_B;

    @JsonProperty("match_id")
    public long match_id;

    @JsonProperty("ride_id")
    public long ride_id;

    @JsonProperty("user_saved_amount")
    public double user_saved_amount;

    @JsonProperty("user_fare")
    public double user_fare;

    @JsonProperty("passenger_id")
    public double passenger_id;

    @JsonProperty("passenger_name")
    public String passenger_name;

    @JsonProperty("pick_up_location_name")
    public String pick_up_location_name;

    @JsonProperty("dropoff_location_name")
    public String drop_off_location_name;

    @JsonProperty("estimated_pickup_time")
    public Timestamp estimated_pickup_time;

    @JsonProperty("estimated_dropoff_time")
    public Timestamp estimated_drop_off_time;

    public String getPick_up_location_name() {
        return pick_up_location_name;
    }

    public void setPick_up_location_name(String pick_up_location_name) {
        this.pick_up_location_name = pick_up_location_name;
    }

    public String getDrop_off_location_name() {
        return drop_off_location_name;
    }

    public void setDrop_off_location_name(String drop_off_location_name) {
        this.drop_off_location_name = drop_off_location_name;
    }

    public Timestamp estimated_pickup_time() {
        return estimated_pickup_time;
    }

    public void setEstimated_pickup_time(Timestamp estimated_pickup_time) {
        this.estimated_pickup_time = estimated_pickup_time;
    }

    public Timestamp getEstimated_drop_off_time() {
        return estimated_drop_off_time;
    }

    public void setEstimated_drop_off_time(Timestamp estimated_drop_off_time) {
        this.estimated_drop_off_time = estimated_drop_off_time;
    }

    public String getPassenger_name() {
        return passenger_name;
    }

    public void setPassenger_name(String passenger_name) {
        this.passenger_name = passenger_name;
    }

    public double getPassenger_id() {
        return passenger_id;
    }

    public void setPassenger_id(double passenger_id) {
        this.passenger_id = passenger_id;
    }

    public ResponseLocationDTO getOrigin() {
        return origin;
    }

    public void setOrigin(ResponseLocationDTO origin) {
        this.origin = origin;
    }

    public ResponseLocationDTO getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(ResponseLocationDTO endpoint) {
        this.endpoint = endpoint;
    }

    public ResponseLocationDTO getWaypoint_A() {
        return waypoint_A;
    }

    public void setWaypoint_A(ResponseLocationDTO waypoint_A) {
        this.waypoint_A = waypoint_A;
    }

    public ResponseLocationDTO getWaypoint_B() {
        return waypoint_B;
    }

    public void setWaypoint_B(ResponseLocationDTO waypoint_B) {
        this.waypoint_B = waypoint_B;
    }

    public long getMatch_id() {
        return match_id;
    }

    public void setMatch_id(long match_id) {
        this.match_id = match_id;
    }

    public long getRide_id() {
        return ride_id;
    }

    public void setRide_id(long ride_id) {
        this.ride_id = ride_id;
    }

    public double getUser_saved_amount() {
        return user_saved_amount;
    }

    public void setUser_saved_amount(double user_saved_amount) {
        this.user_saved_amount = user_saved_amount;
    }

    public double getUser_fare() {
        return user_fare;
    }

    public void setUser_fare(double user_fare) {
        this.user_fare = user_fare;
    }
}
