import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkPNLxjmSXqouLu8cETrIbRInTvLURCWc",
  authDomain: "twitter-clone-78e2e.firebaseapp.com",
  projectId: "twitter-clone-78e2e",
  storageBucket: "twitter-clone-78e2e.appspot.com",
  messagingSenderId: "381551665644",
  appId: "1:381551665644:web:a1aeb17878f473961ea0c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
