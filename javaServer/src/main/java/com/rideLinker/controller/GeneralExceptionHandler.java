package com.rideLinker.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

//@ControllerAdvice
public class GeneralExceptionHandler {



//    @ExceptionHandler(ResponseStatusException.class)
    public String defaultErrorHandler(HttpServletRequest req, Exception e){
        return  e.getMessage();
    }
}
