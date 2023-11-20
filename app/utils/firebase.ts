import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCcChIPqHFZ8smnI0T8nkokzVMBtyYKLhQ",
  authDomain: "blearn-405015.firebaseapp.com",
  projectId: "blearn-405015",
  storageBucket: "blearn-405015.appspot.com",
  messagingSenderId: "603969483612",
  appId: "1:603969483612:web:dcdb10fedffa1361e40799",
  measurementId: "G-LXE4TYJZ3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDB = getStorage(app)