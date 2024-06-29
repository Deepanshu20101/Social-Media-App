// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "social-media-app-d9a8c.firebaseapp.com",
  projectId: "social-media-app-d9a8c",
  storageBucket: "social-media-app-d9a8c.appspot.com",
  messagingSenderId: "146934502147",
  appId: "1:146934502147:web:940d69d9155d2ce28bcf36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
