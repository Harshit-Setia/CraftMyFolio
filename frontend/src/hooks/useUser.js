import { useQuery } from "@tanstack/react-query";
// 1. We must now import useAuth from the hook file, not the context file
import { useAuth } from "../hooks/useAuth"; 

const fetchUserData = async (token) => {
  // If there's no token, don't even try to fetch
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
      // We will check for this specific error message
      throw new Error(errorData.message || "Failed to authenticate token.");
    }

    const response = await res.json();
    return response.data; // Return the user data object

  } catch (error) {
    console.error(error.message);
    // Re-throw the error for TanStack Query to handle
    throw error;
  }
};

export function useUser() {
  // 2. Get BOTH 'token' and 'logout' from useAuth
  const { token, logout } = useAuth(); 

  return useQuery({

    queryKey: ["user", token],

    queryFn: () => fetchUserData(token),

    enabled: !!token,
    
    // 3. NEW: Add an onError handler
    onError: (error) => {
      // Check if the error is an authentication error
      // These messages should match what your backend sends (e.g., from authMiddleware)
      const authErrorMessages = [
        'Not authorized, token failed',
        'Failed to authenticate token.',
        'No user found with this token'
      ];
      
      if (authErrorMessages.includes(error.message)) {
        console.error("Invalid token detected. Logging out...");
        // This is the fix! We call logout() to clear the bad token.
        logout();
      }
    },
    
    // 4. Update retry logic
    retry: (failureCount, error) => {
      // Don't retry if it was an auth error (we just logged out)
      const authErrorMessages = [
        'Not authorized, token failed',
        'Failed to authenticate token.',
        'No user found with this token'
      ];
      if (authErrorMessages.includes(error.message)) {
        return false;
      }
      return failureCount < 3;
    },
  });
}