import React from "react";
import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";

import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

const Header = () => {
  const { token } = useAuth();
  
  const { data: user, isLoading } = useUser();

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-2xl font-bold text-indigo-700">
          <Link to="/">CraftFolio</Link>
        </div>
        <SearchBar />

        <div className="flex items-center space-x-5">
          {isLoading && token ? ( 
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
          ) : token && user ? (
            <Avatar userName={user.name} imageUrl={user.avatar} />
          ) : (
            <AuthButtons />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;