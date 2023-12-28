import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signIn = async (email, password) => {
  try {
    if (!email || !password) {
      console.error("Please provide both email and password.");
      return false;
    }

    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Error signing in:", error.message);
    return false;
  }
};
