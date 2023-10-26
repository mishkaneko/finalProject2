import { createPaymentIntentByRideId, paymentIntentWebhookCallback } from './payment.service';
import express from 'express';
const router = express.Router();

const stripe = require('stripe')(
  'sk_test_51O3QSSGCNKPV1lcPJF09cnrzIsNs6LtHIdLQ3ipHF6q6bATGSCPDYGHSCkPnqLMuJzhdHJhrnCEfnSmYgswX6Ngi00yjoYi7DY'
);
const { getAmount, saveStripeId } = require('./payment.service.ts');
router.post('/intent/:rideId', async (req, res, next) => {
  try {
    // console.log(+req.params.rideId);
    let json = await createPaymentIntentByRideId(+req.params.rideId!);
    res.json(json);
  } catch (error) {
    next(error);
  }
});

router.get('/callback', async (req, res) => {});

router.post('/webhook', async (req, res) => {
  console.log('received stripe webhook:', req.body);
  switch (req.body.type) {
    case 'payment_intent.succeeded':
    case 'payment_intent.canceled':
      let json = await paymentIntentWebhookCallback(req.body.data.object.id);
      res.json(json);
      break;
    case 'payment_intent.payment_failed':
    case 'payment_intent.processing':
    default:
      console.log('unknown stripe webhook event type:', req.body);
      res.status(501).json({ error: 'unknown stripe event type' });
  }
});

module.exports = router;
