import express, { ErrorRequestHandler } from 'express';
import { print } from 'listening-on';
import cors from 'cors';
import { HttpError } from './http.error';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { knex } from './knex';
import path from 'path';
import http from 'http';
import { setupWebSocket, closeAllConnections } from './socket/socket';

let app = express();
const server = new http.Server(app);
setupWebSocket(server);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let userService = new UserService(knex);

app.use('/admin', require('./admin/admin.routes'));
app.use('/passenger/payment', require('./stripe/payment.routes'));

// TEMPORARY
app.use('/passenger', require('./socket/passenger.routes'));

app.use(new UserController(userService).router);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

let errorHandler: ErrorRequestHandler = (err: HttpError, req, res, next) => {
  if (!err.statusCode) console.error(err);
  res.status(err.statusCode || 500);
  let error = String(err).replace(/^(\w*)Error: /, '');
  if (req.headers.accept?.includes('application/json')) {
    res.json({ error });
  } else {
    res.end(error);
  }
};

app.use(errorHandler);

let port = 8100;
// app.listen(port, () => {
//   print(port);
// });

server.listen(port, () => {
  print(port);
});
