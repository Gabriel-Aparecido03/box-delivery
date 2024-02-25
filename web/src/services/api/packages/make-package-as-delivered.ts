import { api } from "../../../lib/axios"

export async function makePackageAsDelivered({ id }:{ id : string}) {
  const res = await api.patch(`/package/status/delivered/${id}`)
  return res
}