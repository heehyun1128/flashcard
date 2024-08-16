"use client";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Checkout from "./Checkout";
import { Button } from "@mui/material";

export const plans = [
  {
    _id: 1,
    name: "Free",
    intro: "The start of your improved productivity",
    price: 0,

    inclusions: {
      header: "The Free plan includes:",
      content: [
        {
          label: "Unlimited flashcard generations",
          isIncluded: true,
        },
        {
          label: "Unlimited private flashcard lists",
          isIncluded: true,
        },
        {
          label: "5 Shared Flashcard lists shared with up to 5 people",
          isIncluded: true,
        },
        {
          label:
            "Gmail, Google Calendar, Microsoft To Do and email forwarding integrations",
          isIncluded: false,
        },
      ],
    },
  },
  {
    _id: 2,
    name: "Pro",
    intro: "Unlock a new level of personal productivity",
    price: 8,
    subPrice: "That's $96 yearly",

    inclusions: {
      header: "Everything in Free, plus:",
      content: [
        {
          label: "Unlimited shared lists",
          isIncluded: true,
        },
        {
          label: "Unlimited shared lists with up to 25 people",
          isIncluded: true,
        },
        {
          label: "Slack, Github, Linear and Figma integrations",
          isIncluded: true,
        },
        {
          label: "Up to 500MB upload & 25GB file storage",
          isIncluded: true,
        },
        {
          label: "Al list creation",
          isIncluded: true,
        },
      ],
    },
  },
  {
    _id: 3,
    name: "Free Team",
    intro: "For smaller teams to organize their work",
    price: 0,
    subPrice: "",

    inclusions: {
      header: "Everything in Free, plus:",
      content: [
        {
          label: "Up to 5 team members",
          isIncluded: true,
        },
        {
          label: "15 shared lists between team members",
          isIncluded: true,
        },
      ],
    },
  },
  {
    _id: 4,
    name: "Pro Team",
    intro: "Maximize productivity across your entire team",
    price: 10,
    subPrice: "120 per member yearly",

    inclusions: {
      header: "Everything in Pro, plus:",
      content: [
        {
          label: "Unlimited team members",
          isIncluded: true,
        },
        {
          label: "Everyone in the team will be upgraded to personal Pro too",
          isIncluded: true,
        },
        {
          label: "Unlimited shared lists with team members and guests",
          isIncluded: true,
        },
      ],
    },
  },
];

const Credits = () => {
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="container  mx-auto mt-10 mb-10 z-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-16 pt-10 pb-10 bg-light-orange rounded-lg ">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className=" bg-[#f5f5f0] p-6 border border-gray-300 rounded-2xl text-center"
          >
            <h3 className="text-4xl font-semibold mb-4">{plan.name}</h3>
            <p className="text-sm mb-4">{plan.intro}</p>
            <div className="flex items-center justify-center font-medium mb-2">
              <p className="mr-2 text-2xl">${plan.price}</p>
              <span className="text-md ">Per Month</span>
            </div>
              <p className="mr-2 text-sm">{plan.subPrice}</p>

            <ul className="mb-4 flex flex-col items-start text-left">
              <p className="text-md mb-4 p-2 ">
                {plan.inclusions.header}{" "}
              </p>
              {plan.inclusions.content.map((inclusion) => (
                <li key={inclusion.label} className="flex items-center mb-2">
                  <span className="ml-2 text-sm">{inclusion.label}</span>
                </li>
              ))}
            </ul>

            {plan.price==0 ? (
              
                <Button
                className="text-deep-orange bg-charcoal-black font-light py-3 px-8 rounded-[0.50rem] text-md transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 backdrop-filter backdrop-blur-3xl w-full"
                >
                  <a href="/">Get Started For Free</a>
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    payAmount={plan.price}
                    
                    userId={userId}
                  />
                </SignedIn>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;
