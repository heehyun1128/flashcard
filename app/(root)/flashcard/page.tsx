
"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import { Box, Card, Container, Typography, Button } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [tilted, setTilted] = useState<{ [key: string]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcards() {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);

      const flashcards: FlashcardData[] = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() } as FlashcardData);
      });
      setFlashcards(flashcards);
    }

    getFlashcards();
  }, [user, search]);

  const handleCardClick = (id: string) => {
    setTilted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePreviousCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Container
      sx={{ width: "100vw", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
       <div className="text-center mb-8">
        <h2 className="text-3xl font-bold uppercase">{search}</h2>
      </div>
      <Box sx={{ position: "relative", width: "300px", height: "400px", marginBottom: "16px" }}>
        {flashcards.map((flashcard, index) => (
          <Box
            key={flashcard.id}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: currentIndex === index ? 1 : 0, 
            }}
            onClick={() => handleCardClick(flashcard.id)}
          >
            <Card
              sx={{
                position: "absolute",
                height: "100%",
                width: "100%",
                borderRadius: "1rem",
                // boxShadow: "8px 4px 8px rgba(0, 0, 0, 0.21)",
                transform: tilted[flashcard.id]
                  ? "translateZ(20px)"
                  : " translateZ(0px)",
                transformOrigin: "center bottom",
                transition: "transform 0.6s, z-index 0s",
                zIndex: tilted[flashcard.id] ? 2 : 1, 
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
                <Typography>
                  {flashcard.back}
                </Typography>
              </Box>
            </Card>
            <Card
              sx={{
                position: "absolute",
                height: "100%",
                width: "100%",
                borderRadius: "1rem",
                // boxShadow: "8px 4px 8px rgba(0, 0, 0, 0.21)",
                transform: tilted[flashcard.id]
                  ? "rotateZ(-20deg) translateZ(0px)"
                  : "rotateZ(0deg) translateZ(20px)",
                transformOrigin: "center bottom",
                transition: "transform 0.6s, z-index 0s",
                zIndex: tilted[flashcard.id] ? 1 : 2, // Purple card should be behind initially
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
                <Typography>
                  {flashcard.front}
                </Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
      <div style={{marginTop:"50px"}}>
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
    </Container>
  );
}
