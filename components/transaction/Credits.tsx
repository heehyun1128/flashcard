"use client";
import { SignedIn, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Container, Typography, Box, Grid } from "@mui/material";
import Checkout from "./Checkout";

export const plans = [
  {
    _id: 1,
    name: "Free",
    price: 0,
    credits: 10,
    inclusions: [
      { label: "10 Free Credits", isIncluded: true },
      { label: "Limited Access to Services", isIncluded: true },
      { label: "Timely Customer Support", isIncluded: false },
    ],
  },
  {
    _id: 2,
    name: "Pro Plan",
    price: 39,
    credits: 150,
    inclusions: [
      { label: "150 Credits", isIncluded: true },
      { label: "Access to Services", isIncluded: true },
      { label: "Timely Customer Support", isIncluded: true },
      { label: "...and much more", isIncluded: true },
    ],
  },
];

const Credits = () => {
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) {
    router.push("/sign-in");
    return null; // Prevents rendering until redirect occurs
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Choose Your Plan
        </Typography>
        <Grid container spacing={4}>
          {plans.map((plan) => (
            <Grid item xs={12} md={6} key={plan._id}>
              <Box
                sx={{
                  p: 4,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="h6">
                  ${plan.price} Per Month
                </Typography>
                <Typography variant="body1">
                  {plan.credits} Credits
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <ul>
                    {plan.inclusions.map((inclusion) => (
                      <li key={inclusion.label}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Image
                            src={`/assets/icons/${
                              inclusion.isIncluded
                                ? "check.svg"
                                : "cross.svg"
                            }`}
                            alt={inclusion.isIncluded ? "check" : "cross"}
                            width={24}
                            height={24}
                          />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {inclusion.label}
                          </Typography>
                        </Box>
                      </li>
                    ))}
                  </ul>
                </Box>
                {plan.name === "Free" ? (
                <></>
                ) : (
                  <SignedIn>
                    <Checkout
                      plan={plan.name}
                      payAmount={plan.price}
                      credits={plan.credits}
                      userId={userId}
                    />
                  </SignedIn>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Credits;
