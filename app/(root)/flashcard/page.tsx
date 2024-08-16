'use client'
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";

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
          <div key={flashcard.id} className="perspective-1000">
            <div
              className={`relative w-full h-64 transition-transform duration-600 transform-style-3d shadow-lg ${
                flipped[flashcard.id] ? 'rotate-y-180' : ''
              }`}
              onClick={() => handleCardClick(flashcard.id)}
            >
              <div className="absolute w-full h-full backface-hidden flex justify-center items-center p-4 bg-orange-white rounded-lg">
                <p className="text-charcoal-black text-lg font-semibold">{flashcard.front}</p>
              </div>
              <div className="absolute w-full h-full backface-hidden flex justify-center items-center p-4 bg-orange-white rounded-lg rotate-y-180">
                <p className="text-charcoal-black text-lg">{flashcard.back}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
