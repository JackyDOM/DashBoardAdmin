import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const authStateChangedListener = (admin) => {
      if (!admin) {
        navigate("/login");
      }
    };
    const authUnsubscribe = onAuthStateChanged(auth, authStateChangedListener);
    setUnsubscribe(() => authUnsubscribe);

    // Close dropdown when clicking outside
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      authUnsubscribe();
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [navigate]);

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const logOut = async () => {
    try {
      if (unsubscribe) {
        unsubscribe();
      }
      await signOut(auth);
      console.log("Logout successful.");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-light" href="/dashboard/management">
          E-Libra Dashboard
        </a>
        <div className="flex items-center">
          <div className="dropdown relative" ref={dropdownRef}>
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
