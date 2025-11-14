import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "./AuthContextStore.js";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const queryClient = useQueryClient();

  // This effect syncs any changes to the token state (e.g., from another tab)
  // This is a more robust way to handle the initial load.
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    
    // Listen for storage changes from other tabs
    window.addEventListener('storage', handleStorageChange);
    // Clean up listener
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    // MODIFICATION: More precise cache removal
    // This just removes the user's data, not all other queries.
    queryClient.removeQueries({ queryKey: ['user'] });
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}