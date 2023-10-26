package com.rideLinker.controller;

import com.rideLinker.dto.driver.*;
import com.rideLinker.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.rideLinker.validator.ValidatorUtils.assertNoNull;

@RestController
@RequestMapping("driver")
public class DriverController {
  @Autowired
  DriverService driverService;

    // POST /driver/job
    //todo I must user post driver here?
    @PostMapping("job")
    public PostDriverJobResponseDTO postDriverJob(@RequestBody PostDriverJobRequestDTO postDriverJobRequestDTO) {
        // to add validation logic
        return driverService.postDriverJob(postDriverJobRequestDTO);
    }

    // POST /driver/job/guide/start
    @PostMapping("job/guide/start")
    public PostDriverJobGuideStartResponseDTO postDriverJobGuideStart(@RequestBody PostDriverJobGuideStartRequestDTO postDriverJobGuideStartRequestDTO) {
        // to add validation logic
        return driverService.postDriverJobGuideStart(postDriverJobGuideStartRequestDTO);
    }

    // POST /driver/job/guide/waypointA
    @PostMapping("job/guide/waypointA")
    public PostDriverJobGuideWaypointAResponseDTO postDriverJobGuideWaypointA(@RequestBody PostDriverJobGuideWaypointARequestDTO requestDTO) {
        // to add validation logic
        assertNoNull(requestDTO, "req.body");
        return driverService.postDriverJobGuideWaypointA(requestDTO);
    }
//
    // POST /driver/job/guide/waypointB
    @PostMapping("job/guide/waypointB")
    public PostDriverJobGuideWaypointBResponseDTO postDriverJobGuideWaypointB(@RequestBody PostDriverJobGuideWaypointBRequestDTO requestDTO) {
        // to add validation logic
        assertNoNull(requestDTO, "req.body");
        return driverService.postDriverJobGuideWaypointB(requestDTO);
    }
//
//    // POST /driver/job/guide/completed
    @PostMapping("job/guide/completed")
    public PostDriverJobGuideCompletedResponseDTO postDriverJobGuideCompleted(@RequestBody PostDriverJobGuideCompletedRequestDTO requestDTO) {
        // to add validation logic
        assertNoNull(requestDTO, "req.body");
        return driverService.postDriverJobGuideCompleted(requestDTO);
    }

    // GET /driver/job
    @GetMapping("job")
    public GetDriverJobResponseDTO getDriverJob(@RequestBody GetDriverJobRequestDTO requestDTO) {
        // to add validation logic
        assertNoNull(requestDTO, "req.body");
        return driverService.getDriverJob(requestDTO);
    }

    // GET /driver/additionalCharges
    @GetMapping("additionalCharges")
    public GetDriverAdditionalChargesResponseDTO getDriverAdditionalCharges(@RequestBody GetDriverAdditionalChargesRequestDTO requestDTO) {
        // to add validation logic
        assertNoNull(requestDTO, "req.body");
        return driverService.getDriverAdditionalCharges(requestDTO);
    }
}
