package com.rideLinker.mapper;

import com.rideLinker.dto.LatLngDTO;
import com.rideLinker.dto.LocationDTO;
import com.rideLinker.entity.LocationEntity;

public class LocationMapper {
    public static LocationEntity toEntity(LocationDTO dto) {
        LocationEntity entity = new LocationEntity();
        entity.setLat(dto.lat);
        entity.setLng(dto.lng);
        entity.setName(dto.name);
        return entity;
    }
    public static LocationDTO toDTO(LocationEntity entity) {
        LocationDTO dto = new LocationDTO();
        dto.lat = entity.getLat();
        dto.lng = entity.getLng();
        dto.name = entity.getName();
        return dto;
    }
}
