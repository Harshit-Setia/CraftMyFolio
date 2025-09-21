import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// --- SVG Icons ---

// Fallback user icon
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

// Dashboard icon for the dropdown menu
const DashboardIcon = () => (
  <svg
    className="w-5 h-5 mr-3 text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

// Logout icon for the dropdown menu
const LogoutIcon = () => (
  <svg
    className="w-5 h-5 mr-3 text-red-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

// The component now accepts props for customization
const Avatar = ({ imageUrl, userName = "Harshit Singla" }) => {
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    console.log("Logout clicked");
    logout();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-indigo-500 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* Conditionally render image or fallback icon */}
        {imageUrl ? (
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={`${userName}'s avatar`}
          />
        ) : (
          <div className="w-full h-full bg-indigo-600 flex items-center justify-center">
            <UserIcon />
          </div>
        )}
      </button>

      {/* Dropdown Menu with Transition */}
      <div
        className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="py-1" role="none">
          <div className="px-4 py-2">
            {/* <p className="text-sm text-gray-700">Signed in as</p> */}
            <p className="text-sm font-medium text-gray-900 truncate">
              {userName}
            </p>
          </div>
          <div className="border-t border-gray-100"></div>
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            <DashboardIcon />
            <span>Dashboard</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900"
            role="menuitem"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
