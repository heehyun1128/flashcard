'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Flashcard {
  name: string;
}

const LoadingScreen: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-deep-orange"></div>
  </div>
);

export default function FlashcardList() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getFlashcards() {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards as Flashcard[];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
      setIsLoading(false);
    }

    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn || isLoading) {
    return <LoadingScreen />;
  }

  const handleCardClick = (name: string) => {
    router.push(`/flashcard?id=${name}`);
  };

  const handleBackClick = () => {
    router.push('/generate');
  };

  const handleEditClick = (index: number, name: string) => {
    setEditingIndex(index);
    setEditName(name);
  };

  const handleEditSubmit = async (index: number) => {
    if (!user) return;
    
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index].name = editName;

    const docRef = doc(collection(db, 'users'), user.id);
    await updateDoc(docRef, { flashcards: updatedFlashcards });

    setFlashcards(updatedFlashcards);
    setEditingIndex(null);
  };

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!user || deleteIndex === null) return;
    
    const updatedFlashcards = flashcards.filter((_, i) => i !== deleteIndex);

    const docRef = doc(collection(db, 'users'), user.id);
    await updateDoc(docRef, { flashcards: updatedFlashcards });

    setFlashcards(updatedFlashcards);
    setDeleteModalOpen(false);
    setDeleteIndex(null);
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-44 md:py-24 lg:py-32">
      {flashcards.length > 0 && (
        <button
          onClick={handleBackClick}
          className="mb-8 flex items-center text-deep-orange hover:text-charcoal-black transition duration-300"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Generate
        </button>
      )}
      {flashcards.length === 0 ? (
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-charcoal-black mb-4">You have no existing flashcards</h2>
          <p className="text-xl text-gray-600 mb-6">Go ahead and create your first with the link below</p>
          <Link href="/generate" className="bg-deep-orange text-charcoal-black px-6 py-3 rounded-lg hover:bg-opacity-90 hover:text-white transition duration-300">
            Create Flashcards
          </Link>
          <div className="mt-4">
            <Link href="/" className="inline-block text-sm text-deep-orange hover:text-charcoal-black transition duration-300">
              Back to Homepage
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flashcards.map((flashcard, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              {editingIndex === index ? (
                <div className="p-6">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <button
                    onClick={() => handleEditSubmit(index)}
                    className="bg-deep-orange text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-300"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-charcoal-black mb-4">{flashcard.name}</h2>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleCardClick(flashcard.name)}
                      className="text-deep-orange hover:text-charcoal-black transition duration-300"
                    >
                      View Cards
                    </button>
                    <div>
                      <button
                        onClick={() => handleEditClick(index, flashcard.name)}
                        className="text-gray-600 hover:text-deep-orange mr-2"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(index)}
                        className="text-gray-600 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4 text-charcoal-black">Confirm Delete</h2>
            <p className="mb-4 text-charcoal-black">Are you sure you want to delete this flashcard list?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="mr-2 px-4 py-2 text-charcoal-black hover:bg-gray-100 rounded-md transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-opacity-90 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}