"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";

import { Button } from "@mui/material";
import getStripe from "@/utils/get-stripe";

const Checkout = ({
  plan,
  payAmount,

  userId,
}: {
  plan: string;
  payAmount: number;

  userId: string;
}) => {
  const { toast } = useToast();

  useEffect(() => {
    // No need to call loadStripe here
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation soon.",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order is canceled!",
        description:
          "If you need assistance or have questions, please contact support.",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, [toast]);

  const checkout = useCallback(
    async (event) => {
      event.preventDefault(); // Prevent form submission

      const checkoutSession = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Correct Content-Type
          Origin: "https://localhost:3000", // Correct Origin
        },
        body: JSON.stringify({
          plan,
          payAmount,

          userId,
        }),
      });

      if (checkoutSession.ok) {
        const checkoutJson = await checkoutSession.json();
        const stripe = await getStripe();

        if (stripe) {
          const { error } = await stripe.redirectToCheckout({
            sessionId: checkoutJson.id,
          });

          if (error) {
            console.warn(error.message);
          }
        } else {
          console.error("Stripe not initialized");
        }
      } else {
        const errorText = await checkoutSession.text();
        console.error("Fetch error:", errorText);
      }
    },
    [plan, payAmount, userId, toast]
  );

  return (
    <form onSubmit={checkout}>
      <section>
        <button
          type="submit"
          role="button"
          className="bg-yellow-500 text-black font-light py-3 px-8 rounded-[0.50rem] text-md transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 backdrop-filter backdrop-blur-3xl w-full uppercase"
        >
          Upgrade Plan
        </button>
      </section>
    </form>
  );
};

export default Checkout;
