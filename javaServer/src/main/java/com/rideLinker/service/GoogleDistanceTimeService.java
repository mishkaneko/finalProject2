package com.rideLinker.service;


import java.awt.geom.Point2D;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.DoubleBuffer;
import java.util.List;

import ch.qos.logback.core.joran.conditional.ThenAction;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.*;
import com.rideLinker.dto.LocationDTO;
import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;
import com.rideLinker.dto.DistanceTimeResDTO;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;

@Service
public class GoogleDistanceTimeService {

    HttpClient httpClient = HttpClient.newHttpClient();


    @Value("${secrets.GOOGLE_API_KEY}")
    private String API_KEY;

    ObjectMapper objectMapper = new ObjectMapper();

    GeoApiContext geoApiContext;

    public GoogleDistanceTimeService() {



    }

    void test() {
//        String sources = "Kowloon Bay MTR Station";
//        String destination = "Kwun Tong MTR Station";
        String sources = "22.311598,114.226512";
        String destination = "22.368037,114.110306";
        try {
            getDistanceDuration(sources, destination);
        } catch (ResponseStatusException e) {
            throw new RuntimeException(e);
        }
    }

    synchronized GeoApiContext getContext() {
        if (geoApiContext == null) {
            System.out.println("API KEY: " + API_KEY);
            geoApiContext = new GeoApiContext.Builder()
                    .apiKey(API_KEY)
                    .build();
            System.out.println("context: " + geoApiContext);
        }
        return geoApiContext;
    }


    public DistanceTimeResDTO getDistanceDuration(LocationDTO source, LocationDTO destination) throws ResponseStatusException {
        return getDistanceDuration(source.toString(), destination.toString());
    }
        public DistanceTimeResDTO getDistanceDuration(String source, String destination) throws ResponseStatusException {



        String[] origins = new String[]{source};
        String[] destinations = new String[]{destination};
        var req = DistanceMatrixApi.getDistanceMatrix(getContext(), origins, destinations)
                .mode(TravelMode.DRIVING)
                .units(Unit.METRIC);
        DistanceMatrix matrix = null;
        try {
            matrix = req.await();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY,"failed to connect to google map server");
        }
        for (DistanceMatrixRow matrixRow : matrix.rows) {
            for (DistanceMatrixElement matrixElement : matrixRow.elements) {
                if (matrixElement.status == DistanceMatrixElementStatus.OK) {
                    DistanceTimeResDTO result = new DistanceTimeResDTO();
                    result.distanceInMeters = (double) matrixElement.distance.inMeters;
                    result.durationInSeconds = (double) matrixElement.duration.inSeconds;
                    return result;
                }
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_GATEWAY,"rejected by google map distance matrix API");
    }



//        final Logger logger = LoggerFactory.getLogger(GoogleDistanceTimeService.class);
//        try{
//
//        var url = "https://maps.googleapis.com/maps/api/distancematrix/json?destination=" + destination + "&origins=" + source + "&key" + API_KEY;
//        var request = HttpRequest.newBuilder().uri((URI.create(url))).GET().build();
//
//        var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
//        String responseBody = response.body();
//            System.out.println(responseBody);
//
//        var distanceTime = objectMapper.readValue(responseBody, new TypeReference<List<DistanceTimeResDTO>>() {
//        });
//        return distanceTime;
//    }catch(Exception e){
//            logger.error(e.getMessage());
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get dta from Google Distance matrix API", e);
//        }
//    }

}