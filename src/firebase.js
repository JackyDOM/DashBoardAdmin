import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXuXYbnMvuzYmNJtGAGlxjPHWG04UiXVQ",
  authDomain: "e-libra-bcb05.firebaseapp.com",
  projectId: "e-libra-bcb05",
  storageBucket: "e-libra-bcb05.appspot.com",
  messagingSenderId: "346191823722",
  appId: "1:346191823722:web:63e71f0e21762409c1db13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const  txtDB = getFirestore(app);
const imgDB = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {imgDB,txtDB,db, auth, provider};
