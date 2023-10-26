package com.rideLinker.controller;

import com.rideLinker.dto.match.GetResponseMatchDriveDTO;
import com.rideLinker.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MatchController {

    @Autowired
    MatchService matchService;

//    @RequestMapping(value = "/drive/job/guide", method = RequestMethod.GET)
//    public GetResponseMatchDriveDTO getmatchedRoute (){
//        return this.matchService.getMatchedRoute();
//
//    }
}
