package com.rideLinker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "`admin`")
public class AdminEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
