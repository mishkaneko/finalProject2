package com.rideLinker.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "`transaction`")
public class TransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`passenger_id`", nullable = false)
    private Long passengerId;

    @Column(name = "`amount`", nullable = false)
    private Double amount;

    @Column(name = "`transaction_time`", nullable = true)
    private Timestamp transactionTime;

    @Column(name = "`passenger_cancel_time`", nullable = true)
    private Timestamp passengerCancelTime;

    @Column(name = "`stripe_charge_id`", nullable = true)
    private String stripeChargeId;

    @Column(name = "`stripe_success_time`", nullable = true)
    private Timestamp stripeSuccessTime;

    @Column(name = "`remark`", nullable = true)
    private String remark;

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

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Timestamp getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(Timestamp transactionTime) {
        this.transactionTime = transactionTime;
    }

    public Timestamp getPassengerCancelTime() {
        return passengerCancelTime;
    }

    public void setPassengerCancelTime(Timestamp passengerCancelTime) {
        this.passengerCancelTime = passengerCancelTime;
    }

    public String getStripeChargeId() {
        return stripeChargeId;
    }

    public void setStripeChargeId(String stripeChargeId) {
        this.stripeChargeId = stripeChargeId;
    }

    public Timestamp getStripeSuccessTime() {
        return stripeSuccessTime;
    }

    public void setStripeSuccessTime(Timestamp stripeSuccessTime) {
        this.stripeSuccessTime = stripeSuccessTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
