'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from 'next/navigation';

interface Flashcard {
  name: string;
}

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards as Flashcard[];
        console.log(collections)
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }

    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return null; 
  }

  const handleCardClick = (name: string) => {
    router.push(`/flashcard?id=${name}`);
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-44 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {flashcards.map((flashcard, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => handleCardClick(flashcard?.name)}
              className="w-full h-full p-6 text-left transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-deep-orange focus:ring-opacity-50"
            >
              <h2 className="text-xl font-semibold text-charcoal-black">{flashcard?.name}</h2>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
