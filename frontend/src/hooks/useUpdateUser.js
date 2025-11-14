import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth"; // Import useAuth to get token

/**
 * A reusable hook for updating user data.
 * @param {function} onClose - The function to call (e.g., to close a modal) on success.
 */
export const useUpdateUser = (onClose) => {
  const queryClient = useQueryClient();
  const { token } = useAuth(); // Get token from AuthContext

  return useMutation({
    mutationFn: (updatedData) => {
      return fetch(`${import.meta.env.VITE_BE_URL}/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token from context
        },
        body: JSON.stringify(updatedData), // Send only the fields to be updated
      }).then(res => {
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
      });
    },
    onSuccess: () => {
      // Invalidate the 'user' query to trigger a re-fetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
      if(onClose) onClose(); // Close the modal
    },
    onError: (error) => {
      console.error("Update failed:", error.message);
      alert("Failed to update profile. Please try again.");
    }
  });
};