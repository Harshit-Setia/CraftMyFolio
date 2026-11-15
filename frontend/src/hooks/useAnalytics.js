import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export function useAnalytics(days) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["analytics", days],
    enabled: !!token,
    staleTime: 60 * 1000,
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BE_URL}/folio/me/analytics?days=${days}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 404) return { noFolio: true };
      if (!res.ok) throw new Error("Could not load analytics.");
      return (await res.json()).data;
    },
  });
}
