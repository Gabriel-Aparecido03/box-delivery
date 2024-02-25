import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/use-auth";
import { useEffect } from "react";

export function AppLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === "ADMIN") {
      navigate('/dashboard/control/deliverymans')
    }
    if (user?.role === "DELIVERYMAN") {
      navigate('/dashboard/deliveryman/near-of-me')
    }
  }, [])
  return (
    <div className="min-h-screen min-w-screen bg-zinc-100">
      < Outlet />
    </div>
  )
}