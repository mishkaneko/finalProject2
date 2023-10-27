import { client } from '../admin/database';
import Stripe from 'stripe';
import { env } from '../env';

let stripe = new Stripe(env.STRIPE_API_KEY, { apiVersion: '2023-10-16' });

export async function createPaymentIntentByRideId(ride_id: number) {
  let result = await client.query(
    /* sql */ `
  select
    transaction.amount
  , transaction.id
  from ride
  inner join transaction on transaction.id = ride.transaction_id
  where ride.id = $1
  `,
    [ride_id]
  );
  let transaction = result.rows[0];
  console.log('transaction:', transaction);

  // let amount = +transaction?.amount;
  // if (!amount) throw new Error('failed to find amount by ride id');
  // TODO VIDEO
  const amount = 59.5;

  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2023-10-16' }
  );
  let paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'hkd',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
    // return_url: env.ORIGIN + '/passenger/payment/callback?transaction_id=' + transaction.id,
  });

  result = await client.query(
    /* sql */ `
  update transaction
  set stripe_charge_id = $1
    , transaction_time = CURRENT_TIMESTAMP
  where id = $2
  `,
    [paymentIntent.id, transaction.id]
  );

  return {
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: env.STRIPE_PUBLISHABLE_KEY,
  };
}

export async function paymentIntentCallback(transaction_id: number) {
  let result = await client.query(
    /* sql */ `
  select stripe_charge_id from transaction
  where id = $1
  `,
    [transaction_id]
  );
  let row = result.rows[0];
  if (!row) throw new Error('transaction not found');
  let payment_intent_id = row.stripe_charge_id;
  return paymentIntentWebhookCallback(payment_intent_id);
}

export async function paymentIntentWebhookCallback(payment_intent_id: string) {
  let result = await client.query(
    /* sql */ `
  select id from transaction
  where stripe_charge_id = $1
  `,
    [payment_intent_id]
  );
  let row = result.rows[0];
  if (!row) throw new Error('transaction not found');
  let transaction_id = row.id;

  let paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
  while (paymentIntent.status == 'processing') {
    paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
    await sleep(1000);
  }

  if (paymentIntent.status == 'succeeded') {
    result = await client.query(
      /* sql */ `
  update transaction
  set stripe_success_time = CURRENT_TIMESTAMP
    , remark = 'stripe payment success'
  where id = $1
  `,
      [transaction_id]
    );
    return {};
  }

  if (paymentIntent.status == 'canceled') {
    result = await client.query(
      /* sql */ `
  update transaction
  set remark = $2
  where id = $1
  `,
      [transaction_id, 'stripe payment canceled']
    );
    return {};
  }

  // TODO handle other status
  console.log('payment intent status:', paymentIntent.status);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
