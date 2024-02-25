import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/use-auth";
import { Button } from "./ui/button";

export function Logout() {
  const { makeLogout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    makeLogout()
    navigate('/')
  }

  return (
    <div>
      <Button onClick={handleLogout} variant="text" text="Log out" />
    </div>
  )
}