import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export function useAuth() {
  const hook = useContext(AuthContext)
  return hook
}