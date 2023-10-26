package com.rideLinker.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
    @Service
    public class JWTService {
        @Value("${jwt.secret}")
        private String jwtSecret;

//todo I need issuer here?
        Algorithm getAlgorithm() {
            return Algorithm.HMAC256(jwtSecret);
        }

        //todo change the jwt
        public String createToken() {
            return JWT.create()
                    .sign(getAlgorithm());
        }

        public long decodeToken(String token) {
            token = token.replace("Bearer ", "");
            long id = Long.parseUnsignedLong(String.valueOf(JWT.require(getAlgorithm()).build().verify(token).getClaim("user_id")));
            if (id > 0) {
                return id;
            }
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "invalid jwt token");
        }


    }
