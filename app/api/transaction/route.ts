import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing Stripe Secret Key. Please check your environment variables.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20',
});

const formatAmount = (amount: number) => Math.round(amount * 100);

export async function POST(req:NextRequest) {
  const {plan, payAmount}=await req.json()
  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription', 
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${plan} Subscription`,
          },
          unit_amount: formatAmount(payAmount), 
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
