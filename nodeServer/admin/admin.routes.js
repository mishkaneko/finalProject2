const express = require('express');
const router = express.Router();
const { getMatchesList, getMatchDetails, updateMatchDetails } = require('./admin-matches.service');
const {
  getDriversList,
  getDriverPersonalInfo,
  updateDriverPersonalInfo,
  getTransactionsList,
  getTransactionDetails,
  updateTransactionDetails,
  addPayoutRecord,
} = require('./admin-drivers.service.ts');

const {
  getPassengersList,
  getPassengerPersonalInfo,
  updatePassengerPersonalInfo,
  getRideHistory,
  getRideDetails,
  updateRideDetails,
  addRefundRecord,
} = require('./admin-passengers.service');

// Drivers ----------------------------------------------------------------------
router.get('/drivers', async (req, res) => {
  let data = await getDriversList();
  res.json(data);
});

router.get('/drivers/:id/personal-information', async (req, res) => {
  let id = req.params.id;
  let data = await getDriverPersonalInfo(id);
  res.json(data[0]);
});

router.put('/drivers/:id/personal-information', async (req, res) => {
  let data = await updateDriverPersonalInfo(req.body);
  res.json(data[0]);
});

router.get('/drivers/:id/transactions', async (req, res) => {
  let id = req.params.id;
  let data = await getTransactionsList(id);
  data = data.map((item) => {
    const { id, ...rest } = item;
    return { transaction_id: id, ...rest };
  });
  res.json(data);
});

router.get('/drivers/:driver_id/transactions/:transaction_id', async (req, res) => {
  const driverId = req.params.driver_id;
  const transactionId = req.params.transaction_id;
  let data = await getTransactionDetails(driverId, transactionId);
  console.log(data);
  res.json(data);
});

router.put('/drivers/:driver_id/transactions/:transaction_id', async (req, res) => {
  let data = updateTransactionDetails(req.body);
  res.json(data);
});

router.post('/drivers/:driver_id/transactions/:transaction_id', async (req, res) => {
  let data = await addPayoutRecord(req.body);
  res.json(data);
});

// Passengers ----------------------------------------------------------------------
router.get('/passengers', async (req, res) => {
  let data = await getPassengersList();
  res.json(data);
});

router.get('/passengers/:id/personal-information', async (req, res) => {
  let id = req.params.id;
  let data = await getPassengerPersonalInfo(id);
  res.json(data[0]);
});

router.put('/passengers/:id/personal-information', async (req, res) => {
  let data = await updatePassengerPersonalInfo(req.body);
  res.json(data[0]);
});

router.get('/passengers/:id/ride-history', async (req, res) => {
  let id = req.params.id;
  let data = await getRideHistory(id);
  res.json(data);
});

router.get('/passengers/:passenger_id/ride-history/:ride_id', async (req, res) => {
  const passengerId = req.params.passenger_id;
  const rideId = req.params.ride_id;
  let data = await getRideDetails(passengerId, rideId);
  res.json(data);
});

router.put('/passengers/:passenger_id/ride-history/:ride_id', async (req, res) => {
  let data = await updateRideDetails(req.body);
  res.json(data);
});

router.post('/passengers/:passenger_id/ride-history/:ride_id', async (req, res) => {
  let data = await addRefundRecord(req.body);
  res.json(data);
});

// Matches ----------------------------------------------------------------------
router.get('/matches', async (req, res) => {
  let data = await getMatchesList();
  // Map the data and rename the 'id' property to 'match_id'
  const transformedData = data.map((item) => {
    const { id, ...rest } = item; // Destructure 'id' and get the rest of the properties
    return { match_id: id, ...rest };
  });

  const transformedDataWithNullReplaced = transformedData.map((item) => {
    const nullReplacedItem = {};

    for (const key in item) {
      if (item[key] === null) {
        nullReplacedItem[key] = '-';
      } else {
        nullReplacedItem[key] = item[key];
      }
    }
    return nullReplacedItem;
  });

  res.json(transformedDataWithNullReplaced);
});

router.get('/matches/:id', async (req, res) => {
  const id = req.params.id;
  let data = await getMatchDetails(id);
  data.match_id = data.id;
  delete data.id;
  res.json(data);
});

router.put('/matches/:id', async (req, res) => {
  const id = req.params.id;
  let data = await updateMatchDetails(id);
  res.json(data);
});

module.exports = router;
