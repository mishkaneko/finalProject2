import { Server as SocketIO } from 'socket.io';
import http from 'http';

let io: SocketIO;
const connectedSockets = new Set();

let userArr: any[] = [];

export function setupWebSocket(server: http.Server) {
  io = new SocketIO(server, { cors: {} });

  io.on('connection', function (socket) {
    console.log('Connected to socket', socket.id);
    connectedSockets.add(socket);

    socket.on('checking', (data) => {
      console.log('checking is working', data);
    });

    // setTimeout(() => {
    //   socket.emit('setHomeStatus', 'invitation');
    // }, 2000);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      connectedSockets.delete(socket);
    });
  });
}

export function getSocket() {
  return io;
}

// export function setHomeStatus(socket: any) {
//   socket.emit('setHomeStatus', 'searching');
//   console.log('emitted home status to searching');
// }

export function closeAllConnections() {
  connectedSockets.forEach((socket: any) => {
    socket.disconnect(true); // Close the socket.
  });
  connectedSockets.clear(); // Clear the set of connections.
}
