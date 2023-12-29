import { auth } from "../../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const signIn = async (email, password) => {
  try {
    if (!email || !password) {
      console.error("Please provide both email and password.");
      return false;
    }

    // Wait for Firebase authentication to initialize
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve();
      });
    });

    // Sign in using provided email and password
    await signInWithEmailAndPassword(auth, email, password);

    return true;
  } catch (error) {
    console.error("Error signing in:", error.code, error.message);
    return false;
  }
};
