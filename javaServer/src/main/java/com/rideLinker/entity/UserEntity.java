package com.rideLinker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "`user`")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`email`", nullable = false)
    private String email;

    @Column(name = "`password_hash`", nullable = false)
    private String passwordHash;

    @Column(name = "`reset_token`", nullable = true)
    private String resetToken;

    @Column(name = "`image`", nullable = true)
    private String image;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
