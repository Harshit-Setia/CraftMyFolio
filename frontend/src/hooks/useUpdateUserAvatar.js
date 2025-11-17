// In a new file: src/hooks/useUpdateUserAvatar.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

// This hook is ONLY for uploading the avatar file
export const useUpdateUserAvatar = (onClose) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`${import.meta.env.VITE_BE_URL}/me/avatar`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update avatar");
      return await res.json();
    },

    onSuccess: () => {
      // 6. Invalidate the 'user' query to update the UI everywhere
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onClose(); // Close the modal
    },
    onError: (error) => {
      console.error("Avatar update failed:", error.message);
      alert("Failed to update avatar. Please try again.");
    },
  });
};
