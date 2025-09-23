import React from "react";
import { Link } from "react-router-dom"; // Step 1: Import Link
import AuthButtons from "./AuthButtons";
import SearchBar from "./SearchBar";
import { useAuth } from "../../context/AuthContext";
import Avatar from "./Avatar";

// SVG component for the search icon

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-700">
          <Link to="/">CraftFolio</Link>
        </div>
        <SearchBar />

        {user ? (
          <Avatar userName={user.user.name} imageUrl={user.user.avatar} />
        ) : (
          <AuthButtons />
        )}
      </nav>
    </header>
  );
};

export default Header;
