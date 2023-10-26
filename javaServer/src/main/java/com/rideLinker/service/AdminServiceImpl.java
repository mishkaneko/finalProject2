package com.rideLinker.service;

import com.rideLinker.dto.admin.GetAdminDriversRequestDTO;
import com.rideLinker.dto.admin.GetAdminDriversResponseDTO;
import com.rideLinker.entity.DriverEntity;
import com.rideLinker.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    DriverRepository driverRepository;

    // Add data through JAVA  (sequel / insomnia json)
    /*public AdminServiceImpl() {
        DriverEntity driverEntity = new DriverEntity();
        driverEntity.setHkid("A123456(3)");
        driverRepository.save(driverEntity);
    }*/

    @Override
    public GetAdminDriversResponseDTO getAdminDrivers(GetAdminDriversRequestDTO getAdminDriversRequestDTO) {
        GetAdminDriversResponseDTO result = new GetAdminDriversResponseDTO();
        result.drivers = driverRepository.findAll();
        return result;
    }
}
