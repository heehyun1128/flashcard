"use client";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { db } from "@/firebase";

import {
  Container,
  Button,
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Link from "next/link";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

interface Flashcard {
  front: string;
  back: string;
}

interface FlippedState {
  [key: number]: boolean; // Use number instead of string for index
}

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
  const [flipped, setFlipped] = useState<FlippedState>({});
  const [text, setText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [tilted, setTilted] = useState<{ [key: string]: boolean }>({});

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ text }), // Ensure text is serialized as JSON
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCardClick = (id: number) => {
    setTilted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async (): Promise<void> => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
    if (!user?.id) {
      alert("User is not authenticated.");
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user?.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f: { name: string }) => f.name === name)) {
        alert("Flashcard collection with the same name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards &&
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, flashcard);
      });
    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };
  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards?.length);
  };

  const handlePreviousCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards?.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container maxWidth="md">
      <Box className="mb-20 text-center">
        <div className="flex align-middle justify-between mb-10">
          <Typography
            variant="h4"
            className="text-2xl font-bold text-charcoal-black mb-4"
          >
            Generate Flashcards
          </Typography>

          <Link href="/flashcards" passHref>
            <button className="bg-gradient-to-r from-deep-orange to-light-orange text-charcoal-black font-bold py-3 px-8 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg backdrop-filter backdrop-blur-3xl">
              All Flashcards
            </button>
          </Link>
        </div>

        <Box className="bg-orange-white p-6 rounded-lg shadow-lg">
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            className="mb-4"
            InputLabelProps={{
              className: "text-charcoal-black",
            }}
            InputProps={{
              className: "text-charcoal-black",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            className="bg-accent-blue hover:bg-accent-blue-dark"
          >
            Submit
          </Button>
        </Box>
      </Box>

      <div
        className="flex-col justify-center align-middle"
        style={{ height: "460px" }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {flashcards?.map((flashcard, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                width: "300px",
                height: "400px",
                zIndex: currentIndex === index ? 1 : 0,
              }}
              onClick={() => handleCardClick(index)}
            >
              <Card
                sx={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  borderRadius: "1rem",
                  // boxShadow: "8px 4px 8px rgba(0, 0, 0, 0.21)",
                  transform: tilted[index]
                    ? "translateZ(20px)"
                    : " translateZ(0px)",
                  transformOrigin: "center bottom",
                  transition: "transform 0.6s, z-index 0s",
                  zIndex: tilted[index] ? 2 : 1,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    backgroundColor: "#FFC671",
                    color: "gray",
                  }}
                >
                  <Typography>{flashcard.back}</Typography>
                </Box>
              </Card>
              <Card
                sx={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  borderRadius: "1rem",
                  // boxShadow: "8px 4px 8px rgba(0, 0, 0, 0.21)",
                  transform: tilted[index]
                    ? "rotateZ(-20deg) translateZ(0px)"
                    : "rotateZ(0deg) translateZ(20px)",
                  transformOrigin: "center bottom",
                  transition: "transform 0.6s, z-index 0s",
                  zIndex: tilted[index] ? 1 : 2, // Purple card should be behind initially
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    backgroundColor: "#8B98FF", // Purple card
                    color: "white", // Text color
                  }}
                >
                  <Typography>{flashcard.front}</Typography>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </div>

      {flashcards?.length && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",

            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <button
              onClick={handlePreviousCard}
              className="bg-gradient-to-r from-deep-orange to-light-orange text-charcoal-black font-bold py-3 px-8 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg backdrop-filter backdrop-blur-3xl"
            >
             {` << Back`}
            </button>
            <button
              onClick={handleNextCard}
              className="bg-gradient-to-r from-deep-orange to-light-orange text-charcoal-black font-bold py-3 px-8 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg backdrop-filter backdrop-blur-3xl ml-20"
            >
             { `Next >>`}
            </button>
          </div>
          {flashcards?.length && (
            <button className="bg-gradient-to-r from-charcoal-black to-black text-white font-bold py-3 px-8 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg backdrop-filter backdrop-blur-3xl"
            onClick={handleOpen}>
              Save Flashcard Group
            </button>
          )}
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcards collection
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            value={name}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
