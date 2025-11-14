import { useContext } from "react";
import { AuthContext } from "../context/AuthContextStore"; // Import the context from its file

// 3. The hook now lives in its own file.
// This file ONLY exports a function, which is perfect.
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}