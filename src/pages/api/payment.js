import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
    // Your payment logic using the 'stripe' instance goes here
}
