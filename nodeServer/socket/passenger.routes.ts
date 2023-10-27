import express from 'express';
const router = express.Router();
import { addRide } from './passenger.service';
// import { getSocket, setHomeStatus, closeAllConnections } from './socket';
import { getSocket, closeAllConnections } from './socket';

router.get('/clean', (req, res) => {
  closeAllConnections();
  console.log('cleaning');
  res.send('cleaning');
});

router.post('/ride-plan', async (req, res) => {
  // const { start_point, end_point, ...rest } = req.body;
  // const start_point_formatted = `(${start_point.lat}, ${start_point.lng})`;
  // const end_point_formatted = `(${end_point.lat}, ${end_point.lng})`;
  // const formattedBody = {
  //   ...rest,
  //   start_point: start_point_formatted,
  //   end_point: end_point_formatted,
  // };
  console.log('HIIIIIIIIIIIIIi');
  res.send('ok');
  // let data = await addRide(formattedBody);
  // res.json(data);

  // const socket = getSocket();
  // setHomeStatus(socket);
});

module.exports = router;
