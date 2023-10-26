package com.rideLinker.service;

import com.rideLinker.dto.match.GetResponseMatchDriveDTO;
import com.rideLinker.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("singleton")
public class MatchService {

    @Autowired
    MatchRepository matchRepository;
//    public GetResponseMatchDriveDTO getMatchedRoute() {
//        Long driverId = 1L;
//        return this.matchRepository.getMatchedRoute(driverId);
//    }
}
