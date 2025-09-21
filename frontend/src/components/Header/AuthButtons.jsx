import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AuthButtons() {
  const { login } = useAuth();

  function handleLogin() {
    login("Harshit Singla");
  }

  return (
    <div className="flex items-center space-x-5">
      <Link
        to="/signin"
        // onClick={handleLogin}
        className="text-gray-800 font-medium hover:text-indigo-600"
      >
        Sign In
      </Link>
      <Link
        // to="/signup"
        onClick={handleLogin}
        className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
      >
        Sign Up
      </Link>
    </div>
  );
}

export default AuthButtons;
