package com.rideLinker.service;

import com.corundumstudio.socketio.HandshakeData;
import com.corundumstudio.socketio.SocketIONamespace;
import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class NotificationService implements CommandLineRunner {
    SocketIOServer socketIOServer;
    SocketIONamespace socketIONamespace;
    @Autowired
    public NotificationService(SocketIOServer server) {
        this.socketIOServer = server;
        this.socketIONamespace = socketIOServer.addNamespace("/notification");
        this.socketIONamespace.addConnectListener(client -> {
            HandshakeData handshakeData = client.getHandshakeData();
            Long userId = 1L;
            if (userId != null) {
                client.joinRoom("user:" + userId);
            }
            System.out.println(handshakeData);
        });
    }

    public void test(){
        this.socketIONamespace.getBroadcastOperations().sendEvent("setHomeStatus", "invitation");
    }

    public void noticeInvitation(Long user1Id, Long user2Id) {
        this.socketIONamespace.getRoomOperations("user:"+user1Id).sendEvent("setHomeStatus", "invitation");
        this.socketIONamespace.getRoomOperations("user:"+user2Id).sendEvent("setHomeStatus", "invitation");
    }

    @Override
    public void run(String... args) throws Exception {
        socketIOServer.start();
    }
}
