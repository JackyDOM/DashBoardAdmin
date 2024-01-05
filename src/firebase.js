import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlCzQw0jACqDXO2291PKuEgTOEb84B1Wo",
  authDomain: "project-website-e-library.firebaseapp.com",
  projectId: "project-website-e-library",
  storageBucket: "project-website-e-library.appspot.com",
  messagingSenderId: "962962738093",
  appId: "1:962962738093:web:c24fb69d1060d6ba942f24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const  txtDB = getFirestore(app);
const imgDB = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {imgDB,txtDB,db, auth, provider};
