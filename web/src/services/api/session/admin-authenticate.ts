import { api } from "../../../lib/axios"

interface AdminAuthtenticateParamsType {
  documentNumber : string
  password : string
}

export async function adminAuthenticate({ documentNumber ,password  }:AdminAuthtenticateParamsType) {
  const res = await api.post('/session/admin/authenticate',{ documentNumber , password })
  return res
}