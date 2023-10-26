package com.rideLinker;


import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

    @Value("${server.host}")
    private String host;

    @Value("${server.port}")
    private Integer port;
    @Value("${server.socketPort}")
    private Integer socketPort;

    @Bean
    public SocketIOServer socketIOServer() {
        Configuration config = new Configuration();
        config.setHostname(host);
        config.setPort(socketPort);
        return new SocketIOServer(config);
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
