import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Account = () => {
  const [authAdmin, setAuthAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authStateChangedListener = (admin) => {
      if (admin) {
        setAuthAdmin(admin);
      } else {
        setAuthAdmin(null);
        navigate("/login");
      }
    };

    const authUnsubscribe = onAuthStateChanged(auth, authStateChangedListener);
    return () => {};
  }, [navigate]);

  return (
    <div className="w-full h-screen flex bg-gray-100 items-center justify-center">
      <div className="w-96 h-[100px] shadow-sm bg-white">
        {authAdmin ? (
          <div className="flex flex-col items-center justify-center px-3 py-4">
            <p>{`Your Account: ${authAdmin.email}`}</p>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};
