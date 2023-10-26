package com.rideLinker.controller;

import static com.rideLinker.validator.ValidatorUtils.assertNoNull;
import com.rideLinker.dto.ride.*;
import com.rideLinker.entity.RideEntity;
import com.rideLinker.service.JWTService;
import com.rideLinker.service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("rides")
public class RideController {

  @Autowired
  RideService rideService;

  @Autowired
  JWTService jwtService;

  // POST /rides/plan
  @PostMapping("plan")
  // PostRidePlanResponseDTO
  public PostRidePlanResponseDTO postRidePlan(
          @RequestBody PostRidePlanRequestDTO postRidePlanRequestDTO
          , @RequestHeader("Authorization") String authorization
  ) {
    // todo @REquest header for authorization
    // if(postRidePlanRequestDTO.userId == null) throw new
    // ResponseStatusException(HttpStatus.BAD_REQUEST,"missing user_id");
    // List<String> missingFields= NullChecker.checkNoNull(postRidePlanRequestDTO);
    //// PostRidePlanResponseDTO result= new PostRidePlanResponseDTO();
    // if (!missingFields.isEmpty()) {
    //// result.error = "missing " + missingFields + " in req.body";
    //// return result;
    // throw new ResponseStatusException(HttpStatus.BAD_REQUEST ,"missing " +
    // missingFields + " in req.body");
    // }
    // missingFields = NullChecker.checkNoNull(postRidePlanRequestDTO.startPoint);
    // if (!missingFields.isEmpty()) {
    // result.error = "missing " + missingFields + " in req.body.start_point";
    // return result;
    // }
    //todo JWT
    postRidePlanRequestDTO.userId = jwtService.decodeToken(authorization);
    assertNoNull("req.body", postRidePlanRequestDTO);
    return rideService.postRidePlan(postRidePlanRequestDTO);
  }

  // GET /rides/:userId
  @GetMapping("{userId}")
  public GetRideByUserIdResponseDTO getRideByUserId(@PathVariable Long userId,
      GetRideByUserIdRequestDTO getRideByUserIdRequestDTO) {
    // to add validation logic
    return rideService.getRideByUserId(userId, getRideByUserIdRequestDTO);
  }

  // POST /rides/:rideId/reject
  @PostMapping("{rideId}/reject")
  public PostRideRejectByRideIdResponseDTO postRideRejectByRideId(@PathVariable Long rideId,
      @RequestBody PostRideRejectByRideIdRequestDTO postRideRejectByRideIdRequestDTO, @RequestHeader("Authorization") String authorization) {
    // to add validation logic
    return rideService.postRideRejectByRideId(rideId, postRideRejectByRideIdRequestDTO);
  }

  // POST /rides/:rideId/cancel
  @PostMapping("{rideId}/cancel")
  public PostRideCancelByRideIdResponseDTO postRideCancelByRideId(@PathVariable Long rideId,
      @RequestBody PostRideCancelByRideIdRequestDTO postRideCancelByRideIdRequestDTO) {
    // to add validation logic
    return rideService.postRideCancelByRideId(rideId, postRideCancelByRideIdRequestDTO);
  }

  // POST /ride/cancellation
  @PostMapping("ride/cancellation")
  public PostRideCancellationResponseDTO postRideCancellation(@RequestBody PostRideCancellationRequestDTO requestDTO) {
    // to add validation logic
    assertNoNull(requestDTO, "req.body");
    return rideService.postRideCancellation(requestDTO);
  }

  // POST /rides/cancellation
  @PostMapping("cancellation")
  public PostRideCancellationResponseDTO postRidesCancellation(@RequestBody PostRideCancellationRequestDTO requestDTO) {
    // to add validation logic
    assertNoNull(requestDTO, "req.body");
    return rideService.postRideCancellation(requestDTO);
  }

  // GET /rides/match
  @GetMapping("match")
  public GetRideMatchResponseDTO getRideMatch(GetRideMatchRequestDTO requestDTO) {
    // todo, I will have a user id by dwt
    assertNoNull(requestDTO, "req.body");
    return rideService.getRideMatch(requestDTO);
  }

    // POST /rides/match/rejection
    @PostMapping("match/rejection")
    public PostRideMatchRejectionResponseDTO postRideMatchRejection(@RequestBody PostRideMatchRejectionRequestDTO requestDTO, @RequestHeader("Authorization") String authorization) {
        // to add validation logic
      requestDTO.userId = jwtService.decodeToken(authorization);
        assertNoNull(requestDTO, "req.body");
        return rideService.postRideMatchRejection(requestDTO);
    }

    // POST /rides/match/cancellation
    @PostMapping("match/cancellation")
    public PostRideMatchCancellationResponseDTO postRideMatchCancellation(@RequestBody PostRideMatchCancellationRequestDTO requestDTO, @RequestHeader("Authorization") String authorization) {
        requestDTO.userId = jwtService.decodeToken(authorization);
        // to add validation logic
        assertNoNull(requestDTO, "req.body");
        return rideService.postRideMatchCancellation(requestDTO);
    }
}
