"use client";

import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { db } from "@/firebase";

interface Flashcard {
  front: string;
  back: string;
}

interface FlippedState {
  [key: string]: boolean;
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
        body: text,
      });
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCardClick = (id: string) => {
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

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "user"), user?.id || "");
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
    handleClose()
    router.push('/flashcards')
  };
}
