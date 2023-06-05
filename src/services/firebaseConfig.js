// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzwF6b_V23nSBPuF7QgAe9151nDGVOcGg",
  authDomain: "todoapp-f9687.firebaseapp.com",
  projectId: "todoapp-f9687",
  storageBucket: "todoapp-f9687.appspot.com",
  messagingSenderId: "810164440173",
  appId: "1:810164440173:web:71ad73def6bb0d59628364"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };