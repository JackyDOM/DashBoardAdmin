import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const expectedEmail = "admin@gmail.com";

const isAdmin = (user) => {
  return user && user.email === expectedEmail;
};

const ProtectedRoute = ({ element }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  console.log(user);
  if (user === null) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin(user)) {
    return <Navigate to="/unauthorized" />;
  }
  return element;
};

export default ProtectedRoute;
