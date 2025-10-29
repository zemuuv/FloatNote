// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFUIAuWanWZSpAq0ipdTbLCKA3aKgKeyM",
  authDomain: "floatnote-5f9ba.firebaseapp.com",
  databaseURL: "https://floatnote-5f9ba-default-rtdb.firebaseio.com",
  projectId: "floatnote-5f9ba",
  storageBucket: "floatnote-5f9ba.firebasestorage.app",
  messagingSenderId: "39932208245",
  appId: "1:39932208245:web:cdb038897b03def462843c",
  measurementId: "G-2F1CKP3VKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);