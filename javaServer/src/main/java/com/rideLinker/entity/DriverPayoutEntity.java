package com.rideLinker.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "`driver_payout`")
public class DriverPayoutEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`amount`", nullable = false)
    private Double amount;

    @Column(name = "`payout_time`", nullable = false)
    private Timestamp payoutTime;

    @Column(name = "`remark`", nullable = true)
    private String remark;

    @Column(name = "`driver_id`", nullable = false)
    private Long driverId;

    @Column(name = "`transaction_id`", nullable = true)
    private Long transactionId;

    @Column(name = "`admin_id`", nullable = false)
    private Long adminId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Timestamp getPayoutTime() {
        return payoutTime;
    }

    public void setPayoutTime(Timestamp payoutTime) {
        this.payoutTime = payoutTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }
}
