import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-8ada6.firebaseapp.com",
  databaseURL: "https://chat-8ada6-default-rtdb.firebaseio.com",
  projectId: "chat-8ada6",
  storageBucket: "chat-8ada6.appspot.com",
  messagingSenderId: "118276457185",
  appId: "1:118276457185:web:50f255e5ee64cf93aeeda0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage()