import { loadStripe, Stripe } from "@stripe/stripe-js";

// Define the type for stripePromise
let stripePromise: Promise<Stripe | null> | undefined;

const getStripe = (): Promise<Stripe | null> => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
    }
    return stripePromise;
};

export default getStripe;
