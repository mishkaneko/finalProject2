package com.rideLinker.controller;

import static com.rideLinker.validator.ValidatorUtils.assertNoNull;
import com.rideLinker.dto.admin.*;
import com.rideLinker.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin")
public class AdminController {
  @Autowired
  AdminService adminService;

  // GET /admin/drivers
  @GetMapping("drivers")
  public GetAdminDriversResponseDTO getAdminDrivers(GetAdminDriversRequestDTO getAdminDriversRequestDTO) {
    // to add validation logic
    return adminService.getAdminDrivers(getAdminDriversRequestDTO);
  }
}
