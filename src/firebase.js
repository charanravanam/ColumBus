// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDIbgXnmH8CmLlDUxEMnLxappVh83yh3VE",
    authDomain: "collegebus-1e0f2.firebaseapp.com",
    projectId: "collegebus-1e0f2",
    storageBucket: "collegebus-1e0f2.firebasestorage.app",
    messagingSenderId: "811948383185",
    appId: "1:811948383185:web:2f871fc038314e948e9ef0",
    measurementId: "G-6Z0FM75QTC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
