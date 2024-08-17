"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import { Box, Card, Container, Typography, Button } from "@mui/material";
interface FlashcardDemo {
  id: string;
  front: string;
  back: string;
}

export default function FlashcardDemo() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<FlashcardDemo[]>([]);
  const [tilted, setTilted] = useState<{ [key: string]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcards() {
      setFlashcards([
        {
          id: "1TF6zzyqsIlO4UWkwGlE",
          front:
            "What is the quadratic formula used for solving quadratic equations?",
          back: "x = (-b ± √(b² - 4ac)) / 2a",
        },
        {
          id: "2CrKfjAAZLTmB0kZyAxo",
          back: "An irrational number is a number that cannot be ex…resentation is non-repeating and non-terminating.",
          front: "What is an irrational number?",
        },
        {
          id: "2IHO4G3xCaZmAV7HmURS",
          front: "What does it mean for two angles to be complementary?",
          back: "Two angles are complementary if the sum of their measures is 90 degrees.",
        },
      ]);
    }

    getFlashcards();
  }, [user, search]);

  const handleCardEnter = (id: string) => {
    setTilted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMouseLeave = (id: string) => {
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

  //   if (!isLoaded || !isSignedIn) {
  //     return <></>;
  //   }

  return (
    <div className=" flex justify-center w-screen">
      <Box
        sx={{
          position: "relative",
          width: "300px",
          height: "400px",
          marginBottom: "16px",
        }}
      >
        {flashcards.map((flashcard, index) => (
          <Box
            key={flashcard.id}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: currentIndex === index ? 1 : 0,
            }}
            onMouseEnter={() => handleCardEnter(flashcard.id)}
            onMouseLeave={() => handleMouseLeave(flashcard.id)}
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
                <Typography>{flashcard.front}</Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </div>
  );
}
