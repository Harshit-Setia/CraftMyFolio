import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const fetchUserData = async (token) => {
  // console.log("Starting the verification frontend")
  try {
    const res = await fetch(`${import.meta.env.VITE_BE_URL}/me`, {
      method: "GET",
      headers: {
        // The 'Authorization' header is the standard way to send a token
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: res.statusText }));
      throw new Error(errorData.message || "Failed to authenticate token.");
    }

    const response = await res.json();
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const intializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const userData = await fetchUserData(token);
          // console.log("User Data " ,userData)
          setUser(userData.data);
        } catch (error) {
          console.error("Authentication Error", error.message);
          localStorage.removeItem("token");
        }
      }

      setLoading(false);
    };

    intializeAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}