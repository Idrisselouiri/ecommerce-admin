// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "mern0blog.firebaseapp.com",
  projectId: "mern0blog",
  storageBucket: "mern0blog.appspot.com",
  messagingSenderId: "62310916789",
  appId: "1:62310916789:web:c4ee07fa219f1d21de14fc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
