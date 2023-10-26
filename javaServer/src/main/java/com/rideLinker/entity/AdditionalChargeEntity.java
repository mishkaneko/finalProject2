package com.rideLinker.entity;

import jakarta.persistence.*;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
@Table(name = "`additional_charge`")
public class AdditionalChargeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`ride_id`", nullable = false)
    private Long rideId;

    @Column(name = "`transaction_id`", nullable = false)
    private Long transactionId;

    @Column(name = "`name`", nullable = false)
    @Enumerated(EnumType.STRING)
    private AdditionalChargeName name;

    @Column(name = "`amount`", nullable = false)
    private Long amount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRideId() {
        return rideId;
    }

    public void setRideId(Long rideId) {
        this.rideId = rideId;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public AdditionalChargeName getName() {
        return name;
    }

    public void setName(AdditionalChargeName name) {
        this.name = name;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
