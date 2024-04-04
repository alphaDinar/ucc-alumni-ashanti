import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// import {getDatabase} from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDD3wkjATD68mjHJvhRVPtWefpc_At4whU",
  authDomain: "ucc-alumni---ashanti-chapter.firebaseapp.com",
  projectId: "ucc-alumni---ashanti-chapter",
  storageBucket: "ucc-alumni---ashanti-chapter.appspot.com",
  messagingSenderId: "759040459526",
  appId: "1:759040459526:web:35d034d39e549d1c9d5487",
  measurementId: "G-MS7CTC1P2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const fireAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const fireStoreDB = getFirestore(app);
export const storageDB = getStorage(app);
