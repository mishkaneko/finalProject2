package com.rideLinker.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "`customer`")
public class CustomerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`gender`", nullable = false)
    private String gender;

    @Column(name = "`phone`", nullable = false)
    private String phone;

    @Column(name = "`name`", nullable = false)
    private String name;

    @Column(name = "`position`", nullable = true)
    private String position;

    @Column(name = "`position_update_time`", nullable = true)
    private Timestamp positionUpdateTime;

    @Column(name = "`last_login_time`", nullable = true)
    private Timestamp lastLoginTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Timestamp getPositionUpdateTime() {
        return positionUpdateTime;
    }

    public void setPositionUpdateTime(Timestamp positionUpdateTime) {
        this.positionUpdateTime = positionUpdateTime;
    }

    public Timestamp getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Timestamp lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }
}
