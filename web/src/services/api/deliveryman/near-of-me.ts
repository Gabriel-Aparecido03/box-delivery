import { Package } from "../../../interfaces/package"
import { api } from "../../../lib/axios"

export async function nearOfMePackages() {
  const res = await api.get<Package[]>(`package/deliveryman`)
  return res
}