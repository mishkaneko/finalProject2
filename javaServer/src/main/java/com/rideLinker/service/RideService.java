package com.rideLinker.service;

import com.rideLinker.dto.ride.*;

public interface RideService {
    PostRidePlanResponseDTO postRidePlan(PostRidePlanRequestDTO requestDTO);

    GetRideByUserIdResponseDTO getRideByUserId(Long userId, GetRideByUserIdRequestDTO requestDTO);

    PostRideRejectByRideIdResponseDTO postRideRejectByRideId(Long rideId, PostRideRejectByRideIdRequestDTO requestDTO);

    PostRideCancelByRideIdResponseDTO postRideCancelByRideId(Long rideId, PostRideCancelByRideIdRequestDTO requestDTO);

    PostRideMatchRejectionResponseDTO postRideMatchRejection(PostRideMatchRejectionRequestDTO requestDTO);

    PostRideMatchCancellationResponseDTO postRideMatchCancellation(PostRideMatchCancellationRequestDTO requestDTO);

    PostRideCancellationResponseDTO postRideCancellation(PostRideCancellationRequestDTO requestDTO);

    GetRideMatchResponseDTO getRideMatch(GetRideMatchRequestDTO requestDTO);
}
