"use client";
// import { SignedIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Checkout from "./Checkout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const plans = [
  {
    _id: 1,
    name: "Basic",
    intro: "Start your AI-powered flashcard journey",
    price: 0,
    inclusions: [
      "50 AI-generated flashcards per month",
      "5 flashcard decks",
      "Basic spaced repetition algorithm",
    ],
  },
  {
    _id: 2,
    name: "Pro",
    intro: "Unlock advanced AI flashcard features",
    price: 9.99,
    subPrice: "That's $119.88 yearly",
    inclusions: [
      "Unlimited AI-generated flashcards",
      "Unlimited flashcard decks",
      "Advanced spaced repetition algorithm",
      "Custom AI model fine-tuning",
      "Priority AI generation queue",
    ],
    popular: true,
  },
  {
    _id: 3,
    name: "Team",
    intro: "Collaborative AI flashcards for groups",
    price: 29.99,
    subPrice: "Up to 5 team members",
    inclusions: [
      "Everything in Pro, plus:",
      "Shared team flashcard decks",
      "Team progress analytics",
      "Collaborative AI model training",
    ],
  },
  {
    _id: 4,
    name: "Enterprise",
    intro: "Custom AI solutions for large organizations",
    price: 99.99,
    subPrice: "Custom pricing for 50+ users",
    inclusions: [
      "Everything in Team, plus:",
      "Dedicated AI model",
      "API access for custom integrations",
      "24/7 premium support",
    ],
  },
];

const Credits = () => {
  // const { userId } = useAuth();
  const router = useRouter();

  // if (!userId) {
  //   router.push("/sign-in");
  //   return null;
  // }

  return (
    <div className="bg-gradient-to-b min-h-1000px py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal-black mb-4">Choose Your AI Flashcard Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Unlock the power of AI-driven learning with our flexible pricing options</p>
        </div>
        <Link href="/" className="text-deep-orange hover:text-charcoal-black transition-colors duration-300 mb-8 inline-block">
          ← Back to Homepage
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`bg-white p-8 rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl flex flex-col justify-between relative ${plan.popular ? 'border-4 border-deep-orange' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-deep-orange text-white py-1 px-4 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold mb-2 text-charcoal-black">{plan.name}</h3>
                <p className="text-sm mb-6 text-gray-600">{plan.intro}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold text-charcoal-black">${plan.price}</span>
                  <span className="text-xl text-gray-600 ml-2">/month</span>
                </div>
                {plan.subPrice && <p className="text-sm text-gray-500 mb-6">{plan.subPrice}</p>}
                <ul className="mb-8 space-y-3">
                  {plan.inclusions.map((inclusion) => (
                    <li key={inclusion} className="flex items-center">
                      <Check className="h-5 w-5 text-deep-orange mr-2" />
                      <span className="text-sm text-gray-700">{inclusion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant={plan.popular ? "default" : "secondary"}
                className={`w-full py-3 ${plan.popular ? 'bg-deep-orange hover:bg-deep-orange-dark text-white' : ''}`}
                disabled={true}
              >
                Coming Soon
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Credits;