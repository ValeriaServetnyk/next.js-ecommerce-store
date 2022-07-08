import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(400).json({ error: 'METHOD NOT ALLOWED' });
  }

  const successUrl = 'http://localhost:3000/success';
  const cancelUrl = 'http://localhost:3000/canceled';
  const quantity = request.body.quantity;
  const mode = request.body.mode;
  const priceId = 'price_1L5b73IOTTKrjRvzhqR15I4e';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: mode,
    line_items: [{ price: priceId, quantity: quantity }],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  console.log(session);
  response.status(200).json({ session: session });
}
