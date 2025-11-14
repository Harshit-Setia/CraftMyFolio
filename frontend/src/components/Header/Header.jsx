import React from "react";
import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";

// 1. Import our new hooks
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

const Header = () => {
  // 2. Get auth status (token) from useAuth
  const { token } = useAuth();
  
  // 3. Get user data, loading, and error states from useUser
  const { data: user, isLoading } = useUser();

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-700">
          <Link to="/">CraftFolio</Link>
        </div>
        <SearchBar />

        {/* 4. This is the new, robust display logic */}
        <div className="flex items-center space-x-5">
          {isLoading && token ? ( // Show loader only if we are logged in and fetching
            // Show a skeleton loader while the user data is being fetched
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
          ) : token && user ? (
            // If we have a token AND the user data, show the Avatar
            <Avatar userName={user.name} imageUrl={user.avatar} />
          ) : (
            // If not loading and no token/user, show Sign In buttons
            <AuthButtons />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;