// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIYjLCpDlat3tir1C1kHO116sEXHIYqeQ",
  authDomain: "bike-builders.firebaseapp.com",
  projectId: "bike-builders",
  storageBucket: "bike-builders.appspot.com",
  messagingSenderId: "919377229280",
  appId: "1:919377229280:web:d946f108b63e22816b2785",
  measurementId: "G-4RT8PC12EL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firebase services to use throughout your app
export { analytics, app, auth, db, storage };

