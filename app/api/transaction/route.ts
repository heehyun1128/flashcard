import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

const formatAmount = (amount: number) => Math.round(amount * 100);

export async function POST(req:NextRequest) {
  try {
    const params = {
      mode: 'subscription', 
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pro Subscription',
          },
          unit_amount: formatAmount(10), 
          recurring: {
            interval: 'month',
            interval_count:1
          },
        },
        quantity: 1,
      }],
      success_url: `http://localhost:3000`,
      cancel_url: `http://localhost:3000`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession,{status:200});
  } catch (err) {
    console.error('Error creating Stripe session:', err);
    return NextResponse.json({ error: 'Failed to create Stripe session' });
  }
}
