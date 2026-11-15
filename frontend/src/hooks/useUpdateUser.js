import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useUpdateUser = (onClose) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (updatedData) => {
      return fetch(`${import.meta.env.VITE_BE_URL}/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData),
      }).then(res => {
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      if(onClose) onClose();
    },
    onError: (error) => {
      console.error("Update failed:", error.message);
      alert("Failed to update profile. Please try again.");
    }
  });
};