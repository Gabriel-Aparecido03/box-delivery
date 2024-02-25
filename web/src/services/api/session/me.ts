import { api } from "../../../lib/axios"

export async function me() {
  const res = await api.get('/session/me')
  return res
}