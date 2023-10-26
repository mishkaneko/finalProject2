package com.rideLinker.model;

import com.rideLinker.dto.LatLngDTO;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="ride")
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "passenger_id")
    private int passengerId;

    @Column(name = "match_id")
    private int matchId;

    @Column(name = "match_status")
    private String matchStatus;

    @Column(name = "start_point")
    private List<Float> startPoint;

    @Column(name = "end_point")
    private List<Float> endPoint;

    @Column(name = "arrive_by_time")
    private Date arriveByTime;

    @Column(name = "transaction_id")
    private int transactionId;

    @Column(name = "distance")
    private int distance;

    @Column(name = "pickup_time")
    private Date pickupTime;

    @Column(name = "dropoff_time")
    private Date dropoffTime;


    public int getId(){return id;}
    public void setId(int id){this.id = id;}

    public int getPassengerId(){return passengerId;}
    public void setPassengerId(int passengerId){this.passengerId = passengerId;}

    public int getMatchId(){return matchId;}
    public void setMatchId(int matchId){this.matchId = matchId;}

    public String getMatchStatus(){return matchStatus;}
    public void setMatchStatus(String matchStatus){this.matchStatus = matchStatus;}

    public List<Float> getStartPoint(){return startPoint;}
    public void setStartPoint(List<Float> startPoint){this.startPoint = startPoint;}

    public List<Float> getEndPoint(){return endPoint;}
    public void setEndPoint(List<Float> endPoint){this.endPoint = endPoint;}

    public Date getArriveByTime(){return arriveByTime;}
    public void setArriveByTime(Date arriveByTime){this.arriveByTime = arriveByTime;}

    public int getTransactionId(){return transactionId;}
    public void setTransactionId(int transactionId){this.transactionId = transactionId;}

    public int getDistance(){return distance;}
    public void setDistance(int distance){this.distance = distance;}

    public Date getPickupTime(){return pickupTime;}
    public void setPickupTime(Date pickupTime){this.pickupTime = pickupTime;}

    public Date getDropoffTime(){return dropoffTime;}
    public void setDropoffTime(Date dropoffTime){this.dropoffTime = dropoffTime;}

}
