import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnhsYfjU56b301iW2OlzM7btcABfuJxkQ",
  authDomain: "campus-connect-adead.firebaseapp.com",
  projectId: "campus-connect-adead",
  storageBucket: "campus-connect-adead.appspot.com",
  messagingSenderId: "600393992968",
  appId: "1:600393992968:web:3c5fac04bb8fc5f3c47abd",
  measurementId: "G-GPZQZFR4QT",
};


// Initialize Firebase
const app =  getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, app, firestore, storage };
