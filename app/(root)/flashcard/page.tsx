'use client'
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});

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
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-44 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {flashcards.map((flashcard) => (
          <motion.div
            key={flashcard.id}
            className="cursor-pointer"
            onClick={() => handleCardClick(flashcard.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-full h-64 relative"
              initial={false}
              animate={{ rotateY: flipped[flashcard.id] ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute w-full h-full backface-hidden flex justify-center items-center p-4 bg-orange-white rounded-lg shadow-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                <p className="text-charcoal-black text-lg font-semibold">{flashcard.front}</p>
              </motion.div>
              <motion.div
                className="absolute w-full h-full backface-hidden flex justify-center items-center p-4 bg-orange-white rounded-lg shadow-lg"
                style={{ backfaceVisibility: "hidden", rotateY: 180 }}
              >
                <p className="text-charcoal-black text-lg">{flashcard.back}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}