import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFUIAuWanWZSpAq0ipdTbLCKA3aKgKeyM",
  authDomain: "floatnote-5f9ba.firebaseapp.com",
  databaseURL: "https://floatnote-5f9ba-default-rtdb.firebaseio.com",
  projectId: "floatnote-5f9ba",
  storageBucket: "floatnote-5f9ba.firebasestorage.app",
  messagingSenderId: "39932208245",
  appId: "1:39932208245:web:cdb038897b03def462843c",
  measurementId: "G-2F1CKP3VKZ",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };