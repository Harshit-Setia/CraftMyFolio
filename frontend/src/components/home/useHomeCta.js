import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

export function useHomeCta() {
  const { token } = useAuth();
  const { data: user } = useUser();
  const slug = user?.folio_id?.slug;

  if (token && user && slug) {
    return {
      primary: { label: "Open your dashboard", to: "/dashboard" },
      secondary: { label: "View your portfolio", to: `/folio/${slug}` },
      templateTo: "/create",
    };
  }

  if (token && user) {
    return {
      primary: { label: "Create your portfolio", to: "/create" },
      secondary: { label: "See templates", to: "/#templates" },
      templateTo: "/create",
    };
  }

  return {
    primary: { label: "Create your portfolio", to: "/signup" },
    secondary: { label: "See templates", to: "/#templates" },
    templateTo: "/signup",
  };
}
