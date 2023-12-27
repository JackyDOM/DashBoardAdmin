import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Welcome to our website");
    return true;
  } catch (error) {
    alert("Incorrect password. Please try again.");
  }
};
