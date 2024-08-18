"use client";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2, RefreshCw, Save } from "lucide-react";

interface Flashcard {
  front: string;
  back: string;
}

interface FlippedState {
  [key: number]: boolean;
}

const SkeletonCard = () => (
  <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
);

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
  const [flipped, setFlipped] = useState<FlippedState>({});
  const [text, setText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [hasExistingFlashcards, setHasExistingFlashcards] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkExistingFlashcards = async () => {
      if (user?.id) {
        const userDocRef = doc(collection(db, "users"), user.id);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || [];
          setHasExistingFlashcards(collections.length > 0);
        }
      }
    };

    checkExistingFlashcards();
  }, [user]);
  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/");
      }
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter some text before generating flashcards.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error:", error);
      setError(
        "An error occurred while generating flashcards. Please try again."
      );
    } finally {
      setIsLoading(false);
      setIsRegenerating(false);
    }
  };

  const handleCardClick = (index: number) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
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

  const promptSuggestions = [
    "Explain the key concepts of photosynthesis",
    "Summarize the main events of World War II",
    "List the fundamental principles of economics",
    "Describe the structure of a human cell",
    "Outline the plot of Shakespeare's Hamlet",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-4xl font-semibold mb-6 text-charcoal-black">
          Generate Flashcards
        </h1>
        {hasExistingFlashcards && (
          <Link
            href="/flashcards"
            className="mb-4 text-deep-orange hover:text-charcoal-black transition duration-300"
          >
            View Existing Flashcards
          </Link>
        )}
        <div className="w-full max-w-2xl bg-orange-white p-6 rounded-lg shadow-md shadow-deep-orange">
          <div className="relative flex flex-col items-center">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your learning material or choose a prompt suggestion below"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-orange resize-none transition-all duration-300 min-h-[150px] text-charcoal-black"
              style={{ height: text ? "auto" : "150px" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.max(target.scrollHeight, 150)}px`;
              }}
            />
            <button
              onClick={handleSubmit}
              className="mt-4 bg-deep-orange text-charcoal-black px-6 py-2 rounded-md hover:bg-opacity-90 hover:text-white transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Generate Flashcards"
              )}
            </button>
          </div>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <div className="mt-6 w-full max-w-2xl">
          <h3 className="text-lg font-semibold mb-2 text-charcoal-black">
            Prompt Suggestions:
          </h3>
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setText(suggestion)}
                className="bg-light-orange text-charcoal-black px-3 py-1 rounded-full text-sm hover:bg-deep-orange hover:text-white transition duration-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {(isLoading || flashcards?.length) && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-charcoal-black">
              {isLoading ? "Generating Flashcards..." : "Flashcards Preview"}
            </h2>
            {!isLoading && flashcards && flashcards.length > 0 && (
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setIsRegenerating(true);
                    handleSubmit();
                  }}
                  className="bg-deep-orange text-charcoal-black px-4 py-2 rounded-md hover:bg-opacity-90 hover:text-white transition duration-300 flex items-center"
                  disabled={isRegenerating}
                >
                  <RefreshCw
                    className={`mr-2 h-4 w-4 ${
                      isRegenerating ? "animate-spin" : ""
                    }`}
                  />
                  {isRegenerating ? "Regenerating..." : "Regenerate"}
                </button>
                <button
                  onClick={handleOpen}
                  className="bg-deep-orange text-charcoal-black px-4 py-2 rounded-md hover:bg-opacity-90 hover:text-white transition duration-300 flex items-center"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading
              ? Array(9)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              : flashcards?.map((flashcard, index) => (
                  <motion.div
                    key={index}
                    className="cursor-pointer w-full h-48"
                    onClick={() => handleCardClick(index)}
                    initial={false}
                    animate={{ rotateY: flipped[index] ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      className="absolute w-full h-full backface-hidden flex justify-center items-center p-4 bg-white rounded-lg shadow-md"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <p className="text-center text-charcoal-black">
                        {flashcard.front}
                      </p>
                    </motion.div>
                    <motion.div
                      className="absolute w-full h-full backface-hidden flex justify-center items-center p-4 bg-white rounded-lg shadow-md"
                      style={{ backfaceVisibility: "hidden", rotateY: 180 }}
                    >
                      <p className="text-center text-charcoal-black">
                        {flashcard.back}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4 text-charcoal-black">
              Save Flashcards
            </h2>
            <p className="mb-4 text-charcoal-black">
              Please enter a name for your flashcards collection
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Collection Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-orange"
            />
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="mr-2 px-4 py-2 text-charcoal-black hover:bg-gray-100 rounded-md transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={saveFlashcards}
                className="px-4 py-2 bg-deep-orange text-charcoal-black rounded-md hover:text-white transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
