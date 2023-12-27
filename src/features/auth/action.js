import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Welcome to our website");
    return true;
  } catch (error) {
    if (error.code === "auth/invalid-login-credentials") {
      alert("Incorrect password. Please try again.");
    } else {
      alert("An error occurred during sign-in.");
    }
    return;
  }
};