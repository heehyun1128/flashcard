'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";


import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Checkout from "@/components/transaction/Checkout";
import Credits from "@/components/transaction/Credits";

export const plans = [
  {
    _id: 1,
    name: "Free",
   
    price: 0,
    credits: 10,
    inclusions: [
      {
        label: "10 Free Credits",
        isIncluded: true,
      },
      {
        label: "Limit Access to Services",
        isIncluded: true,
      },
      {
        label: "Timely Customer Support",
        isIncluded: false,
      },
   
    ],
  },
  {
    _id: 2,
    name: "Pro Plan",
   
    price: 39,
    credits: 150,
    inclusions: [
      {
        label: "150 Credits",
        isIncluded: true,
      },
      {
        label: "Access to Services",
        isIncluded: true,
      },
      {
        label: "Timely Customer Support",
        isIncluded: true,
      },
      {
        label: "...and much more",
        isIncluded: true,
      },
     
    ],
  },

];


export default function Home() {
  const router=useRouter()
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flasheard Saas</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard
          </Typography>
          <SignedOut>
            <Link href="/sign-in">
              <Button color="inherit">Sign In/ Sign Up</Button>
            </Link>
          
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2">Welcome to Flashcard</Typography>
        <Typography variant="h5">xxx</Typography>
        <Button onClick={()=>router.push('/generate')} variant="contained">Get started</Button>
      </Box>
      <Box>Feature Section</Box>
      <Box><Credits/></Box>
    </Container>
  );
}
