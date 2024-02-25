//package/deliveryman

import { Package } from "../../../interfaces/package"
import { api } from "../../../lib/axios"

export async function myPackages() {
  const res = await api.get<Package[]>(`package/deliveryman`)
  return res
}