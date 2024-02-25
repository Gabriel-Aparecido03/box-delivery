import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../header";
import { useEffect } from "react";
import { useAuth } from "../../hook/use-auth";

export function AuthLayout() {

  const { pathname } = useLocation()
  const howIsSelected = pathname.split('/')[3]

  const { hasAccountIsLogged } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!hasAccountIsLogged) {
      navigate('/')
    }
  },[hasAccountIsLogged])

  return (
    <div className="min-h-screen min-w-screen bg-zinc-100">
      <Header howIsSelected={howIsSelected} />
      <div className="max-w-[1500px] w-11/12  mx-auto flex-1 mt-12">
        <h1 className="capitalize text-zinc-700 font-bold text-4xl">{howIsSelected}</h1>
        <Outlet />
      </div>
    </div>
  )
}