import React from "react";
import { Link } from "react-router-dom"; // Step 1: Import Link

// SVG component for the search icon
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Side: Logo */}
        <div className="text-2xl font-bold text-indigo-700">
          {/* Step 2: Use Link and the 'to' prop for internal routes */}
          <Link to="/">CraftFolio</Link>
        </div>

        {/* Middle: Search Bar */}
        <div className="relative w-1/3 hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Find templates..."
            className="w-full bg-gray-100 text-gray-700 border border-transparent rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Right Side: Auth Buttons */}
        <div className="flex items-center space-x-5">
          <Link
            to="/signin"
            className="text-gray-800 font-medium hover:text-indigo-600"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
