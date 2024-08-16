'use client'
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { db } from "@/firebase";

interface Flashcard {
  front: string;
  back: string;
}

interface FlippedState {
  [key: number]: boolean;
}

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
  const [flipped, setFlipped] = useState<FlippedState>({});
  const [text, setText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = async () => {
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
    }
  };

  const handleCardClick = (id: number) => {
    setFlipped((prev) => ({
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-4xl font-semibold mb-6 text-charcoal-black">Generate Flashcards</h1>
        <div className="w-full max-w-2xl bg-orange-white p-6 rounded-lg shadow-md">
          <div className="relative flex flex-col items-center">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-orange resize-none overflow-hidden transition-all duration-300"
              style={{ height: text ? 'auto' : '48px', minHeight: '48px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
            <button
              onClick={handleSubmit}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-deep-orange text-white p-2 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {flashcards?.length && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-charcoal-black">Flashcards Preview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {flashcards.map((flashcard, index) => (
              <div key={index} className="perspective-1000">
                <div
                  className={`relative w-full h-48 transition-transform duration-600 transform-style-3d cursor-pointer ${
                    flipped[index] ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="absolute w-full h-full backface-hidden flex justify-center items-center p-4 bg-white rounded-lg shadow-md">
                    <p className="text-center text-charcoal-black">{flashcard.front}</p>
                  </div>
                  <div className="absolute w-full h-full backface-hidden flex justify-center items-center p-4 bg-white rounded-lg shadow-md rotate-y-180">
                    <p className="text-center text-charcoal-black">{flashcard.back}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleOpen}
              className="bg-deep-orange text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition duration-300"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4 text-charcoal-black">Save Flashcards</h2>
            <p className="mb-4 text-charcoal-black">Please enter a name for your flashcards collection</p>
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
                className="px-4 py-2 bg-deep-orange text-white rounded-md hover:bg-opacity-90 transition duration-300"
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
