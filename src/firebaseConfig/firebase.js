// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA_lVCnt5oWel3qXEZiyS_cbSgcuY11_MU",
  authDomain: "cadeapp-d4fe5.firebaseapp.com",
  projectId: "cadeapp-d4fe5",
  storageBucket: "cadeapp-d4fe5.appspot.com",
  messagingSenderId: "639190160106",
  appId: "1:639190160106:web:3afa6d63d1f436eec93d93",
  measurementId: "G-83KJVF1XSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//conexión a la base de datos
export const db = getFirestore(app)