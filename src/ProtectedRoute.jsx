import  { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const isAdmin = (user) => {
  // Update this function based on your user data structure
  return user && user.roles && user.roles.includes("admin");
};

const ProtectedRoute = ({ element }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdmin(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (admin === null) {
    return <div>Loading...</div>;
  }

  if (!admin) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (!isAdmin(admin)) {
    // Redirect to home if not an admin
    return <Navigate to="/" />;
  }

  // User is authenticated and has admin role, render the protected route
  return element;
};

export default ProtectedRoute;
