set -e
source .env
set -x

./stripe.exe login --api-key $STRIPE_API_KEY

./stripe.exe listen \
  --events payment_intent.succeeded,payment_intent.payment_failed \
  --forward-to localhost:8100/passenger/payment/webhook
  