import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export const addToWaitlist = async (name: string, email: string) => {
  try {
    const docRef = await addDoc(collection(db, "waitlist"), {
      name,
      email,
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export const getWaitlistUsers = async () => {
  const waitlistUsers = [];
  const querySnapshot = await getDocs(collection(db, "waitlist"));
  querySnapshot.forEach((doc) => {
    waitlistUsers.push({ id: doc.id, ...doc.data() });
  });
  return waitlistUsers;
};
