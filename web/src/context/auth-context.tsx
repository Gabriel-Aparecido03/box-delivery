/* eslint-disable no-useless-catch */
import { ReactNode, createContext, useEffect, useState } from "react";
import { adminAuthenticate } from "../services/api/session/admin-authenticate";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { me } from "../services/api/session/me";
import { deliverymanAuthenticate } from "../services/api/session/deliveryman-authenticate";

type User = {
  name: string
  documentNumber: string
  id: string
  role: 'ADMIN' | 'DELIVERYMAN'
  latitude: number
  longitude: number
}

export interface AuthContextType {
  user: User | null
  hasAccountIsLogged: boolean
  makeLoginLikeAdmin: (coumentNumber: string, password: string) => Promise<void>
  makeLoginLikeDeliveryman: (coumentNumber: string, password: string) => Promise<void>
  makeLogout: () => Promise<void>
}

interface AuthContextProvider {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProvider) {

  const [user, setUser] = useState<User | null>(null)
  const [hasAccountIsLogged, setHasAccountIsLogged] = useState(false)

  async function makeLoginLikeAdmin(documentNumber: string, password: string) {
    try {
      const res = await adminAuthenticate({ documentNumber, password })
      if (res.status === 200) {
        const accessToken = res.data.access_token
        saveTokenAtCookies(accessToken)
        setHasAccountIsLogged(true)
      }
    } catch (error) {
      throw error
    }
  }

  async function makeLoginLikeDeliveryman(documentNumber: string, password: string) {
    try {
      const res = await deliverymanAuthenticate({ documentNumber, password })
      if (res.status === 200) {
        const accessToken = res.data.access_token
        saveTokenAtCookies(accessToken)
        setHasAccountIsLogged(true)
      }
    } catch (error) {
      throw error
    }
  }

  async function gettingUserInfo() {
    const cookie = Cookies.get('token');
    if (cookie) {
      const { data } = await me()
      setUser({
        documentNumber : data.documentNumber,
        id : data.id,
        latitude : data.coordinates.latitude,
        longitude : data.coordinates.longitude,
        name : data.name,
        role : jwtDecode(cookie).role
      })
      setHasAccountIsLogged(true)
    }
  }

  async function makeLogout() {
    removeTokenAtCookie()
    setUser(null)
    setHasAccountIsLogged(false)
  }

  function saveTokenAtCookies(token: string) {
    Cookies.set('token', token, { expires: 1, secure: true });
  }

  function removeTokenAtCookie() {
    Cookies.remove('token');
  }

  useEffect(() => {
    gettingUserInfo()
  },[])

  return (
    <AuthContext.Provider value={{ makeLoginLikeAdmin, makeLoginLikeDeliveryman, makeLogout, user, hasAccountIsLogged }}>
      {children}
    </AuthContext.Provider>
  )
}