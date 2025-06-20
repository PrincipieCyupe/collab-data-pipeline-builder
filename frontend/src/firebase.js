// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 

const firebaseConfig = {
  apiKey: "AIzaSyDqkwWpdHZHDguOn81J0HsmcoXMCZWUmX4",
  authDomain: "collab-pipeline.firebaseapp.com",
  projectId: "collab-pipeline",
  storageBucket: "collab-pipeline.firebasestorage.app",
  messagingSenderId: "1071688794250",
  appId: "1:1071688794250:web:e804f5dfbcc1a21ed72d73",
  measurementId: "G-863QDR3N07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export auth so other files can use it
export const auth = getAuth(app);
