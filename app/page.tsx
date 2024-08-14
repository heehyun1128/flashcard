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

export default function Home() {
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
        <Button variant="contained">Get started</Button>
      </Box>
      <Box>Feature Section</Box>
      <Box>Pricing</Box>
    </Container>
  );
}
