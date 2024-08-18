
"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

const LoadingScreen: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-deep-orange"></div>
  </div>
);

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcards() {
      if (!search || !user) {
        setIsLoading(false);
        return;
      }

      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);

      const flashcards: FlashcardData[] = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() } as FlashcardData);
      });
      setFlashcards(flashcards);
      setIsLoading(false);
    }

    getFlashcards();
  }, [user, search]);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  const handleBackClick = () => {
    router.push('/flashcards');
  };

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePreviousCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  if (!isLoaded || !isSignedIn || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen container mx-auto px-4 py-16 md:py-24 lg:py-32 max-w-7xl">
      <button
        onClick={handleBackClick}
        className="mb-8 flex items-center text-deep-orange hover:text-charcoal-black transition duration-300"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Flashcards
      </button>
      {flashcards.length > 0 && (
        <div className="max-w-2xl w-full">
          <motion.div
            className="w-full h-96 relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
            onClick={handleCardClick}
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-8"
              style={{ backfaceVisibility: "hidden" }}
            >
              <h2 className="text-2xl font-bold mb-4 text-deep-orange" style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}>
                {flipped ? "Answer" : "Question"}
              </h2>
              <p className="text-charcoal-black text-xl text-center" style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}>
                {flipped ? flashcards[currentCardIndex].back : flashcards[currentCardIndex].front}
              </p>
            </motion.div>
          </motion.div>
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevCard}
              className="flex items-center text-deep-orange hover:text-charcoal-black transition duration-300"
            >
              <ChevronLeft size={24} />
              Previous
            </button>
            <span className="text-charcoal-black">
              {currentCardIndex + 1} / {flashcards.length}
            </span>
            <button
              onClick={handleNextCard}
              className="flex items-center text-deep-orange hover:text-charcoal-black transition duration-300"
            >
              Next
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}