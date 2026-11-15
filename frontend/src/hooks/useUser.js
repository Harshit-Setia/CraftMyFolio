import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"; 

const authErrorMessages = [
        'Not authorized, token failed',
        'Failed to authenticate token.',
        'No user found with this token'
      ];

const fetchUserData = async (token) => {
  if (!token) return null;

  try {
    const res = await fetch(`${import.meta.env.VITE_BE_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: res.statusText }));
      throw new Error(errorData.message || "Failed to authenticate token.");
    }

    const response = await res.json();
    return response.data;

  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export function useUser() {
  const { token, logout } = useAuth(); 

  const query = useQuery({
    queryKey: ["user"],
    
    queryFn: () => fetchUserData(token),
    enabled: !!token,
    
    retry: (failureCount, error) => {     
      if (authErrorMessages.includes(error.message)) {
        return false;
      }
      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (query.error) {
      console.log("Error detected:", query.error.message);
            
      if (authErrorMessages.includes(query.error.message)) {
        console.error("Invalid token detected. Logging out...");
        logout();
      }
    }
  }, [query.error, logout]);

  return query;
}