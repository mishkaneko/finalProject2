package com.rideLinker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "`driver`")
public class DriverEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`hkid`", nullable = false)
    private String hkid;

    @Column(name = "`driving_license_no`", nullable = false)
    private String drivingLicenseNo;

    @Column(name = "`taxi_driver_identity_plate`", nullable = false)
    private String taxiDriverIdentityPlate;

    @Column(name = "`vehicle_license`", nullable = false)
    private String vehicleLicense;

    @Column(name = "`license_plate_no`", nullable = false)
    private String licensePlateNo;

    @Column(name = "`is_available`", nullable = false)
    private Boolean isAvailable;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHkid() {
        return hkid;
    }

    public void setHkid(String hkid) {
        this.hkid = hkid;
    }

    public String getDrivingLicenseNo() {
        return drivingLicenseNo;
    }

    public void setDrivingLicenseNo(String drivingLicenseNo) {
        this.drivingLicenseNo = drivingLicenseNo;
    }

    public String getTaxiDriverIdentityPlate() {
        return taxiDriverIdentityPlate;
    }

    public void setTaxiDriverIdentityPlate(String taxiDriverIdentityPlate) {
        this.taxiDriverIdentityPlate = taxiDriverIdentityPlate;
    }

    public String getVehicleLicense() {
        return vehicleLicense;
    }

    public void setVehicleLicense(String vehicleLicense) {
        this.vehicleLicense = vehicleLicense;
    }

    public String getLicensePlateNo() {
        return licensePlateNo;
    }

    public void setLicensePlateNo(String licensePlateNo) {
        this.licensePlateNo = licensePlateNo;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }
}
