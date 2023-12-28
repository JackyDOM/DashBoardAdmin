import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(null);

  useEffect(() => {
    const authStateChangedListener = (admin) => {
      if (!admin) {
        navigate("/login");
      }
    };
    const authUnsubscribe = onAuthStateChanged(auth, authStateChangedListener);
    setUnsubscribe(() => authUnsubscribe);
    return () => {
      authUnsubscribe();
    };
  }, [navigate]);

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const logOut = () => {
    if (unsubscribe) {
      unsubscribe();
    }
    signOut(auth)
      .then(() => {
        console.log("Logout successful.");
        navigate(-1);
      })
      .catch((error) => console.error(error));
  };

  return (
    <nav className="bg-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-light" href="/dashboard/management">
          E-Libra Dashboard
        </a>
        <div className="flex items-center">
          <div className="dropdown relative">
            <button className="text-light dropdown-toggle" onClick={toggleAccountDropdown}>
              Account
            </button>
            <div className={`dropdown-menu ${isAccountDropdownOpen ? "block" : "hidden"}`}>
              <a className="dropdown-item" href="/account">
                Profile
              </a>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={logOut}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
