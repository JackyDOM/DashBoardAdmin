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
    <nav className="navbar navbar-expand-lg bg-gray-700">
      <div className="flex space-x-10 justify-between w-screen">
        <a className="ml-5 navbar-brand text-light" href="/dashboard/management">
          E-Libra Dashboard
        </a>
        <div className="flex mx-4">
          <div className="dropdown flex" onClick={toggleAccountDropdown}>
            <a
              className="navbar-brand text-light dropdown-toggle"
              role="button"
              id="accountDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={isAccountDropdownOpen}
            >
              Account
            </a>
            <div
              className={`dropdown-menu mt-5 ${isAccountDropdownOpen ? "show" : ""}`}
              aria-labelledby="accountDropdown"
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
