// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_4kibf0TE480QUyqfXYwjsrrebUrk3Q4",
  authDomain: "vehicleapp-89f92.firebaseapp.com",
  projectId: "vehicleapp-89f92",
  storageBucket: "vehicleapp-89f92.appspot.com",
  messagingSenderId: "906406394056",
  appId: "1:906406394056:web:bae99e9f17b4576da50dfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };