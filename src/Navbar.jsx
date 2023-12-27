import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="bg-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-light" href="/dashboard/management">
          E-Libra Dashboard
        </a>
        <div className="flex items-center">
          <div className="dropdown relative">
            <button
              className="text-light dropdown-toggle"
              onClick={toggleAccountDropdown}
            >
              Account
            </button>
            <div
              className={`dropdown-menu ${isAccountDropdownOpen ? "block" : "hidden"}`}
            >
              <a className="dropdown-item" href="/account">
                Profile
              </a>
              <a className="dropdown-item" href="/account/settings">
                Settings
              </a>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
