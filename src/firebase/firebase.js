import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCp9aTP3oHXEDUCchemz18Cs0wkr2SuKrA",
  authDomain: "sapp-eb62e.firebaseapp.com",
  projectId: "sapp-eb62e",
  storageBucket: "sapp-eb62e.appspot.com",
  messagingSenderId: "921527022022",
  appId: "1:921527022022:web:a093686871b121fedd82c7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();