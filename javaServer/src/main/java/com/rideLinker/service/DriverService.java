package com.rideLinker.service;

import com.rideLinker.dto.driver.*;

public interface DriverService {
    PostDriverJobGuideStartResponseDTO postDriverJobGuideStart(PostDriverJobGuideStartResponseDTO postDriverJobGuideStartResponseDTO);

    GetDriverJobResponseDTO getDriverJob(GetDriverJobRequestDTO requestDTO);

    GetDriverAdditionalChargesResponseDTO getDriverAdditionalCharges(GetDriverAdditionalChargesRequestDTO requestDTO);

    PostDriverJobResponseDTO postDriverJob(PostDriverJobRequestDTO requestDTO);

    PostDriverJobGuideStartResponseDTO postDriverJobGuideStart(PostDriverJobGuideStartRequestDTO requestDTO);

    PostDriverJobGuideWaypointAResponseDTO postDriverJobGuideWaypointA(PostDriverJobGuideWaypointARequestDTO requestDTO);

    PostDriverJobGuideWaypointBResponseDTO postDriverJobGuideWaypointB(PostDriverJobGuideWaypointBRequestDTO requestDTO);

    PostDriverJobGuideCompletedResponseDTO postDriverJobGuideCompleted(PostDriverJobGuideCompletedRequestDTO requestDTO);
}
