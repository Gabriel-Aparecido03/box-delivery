import { api } from "../../../lib/axios"

export async function makePackageAsPickup({ id }:{ id : string}) {
  const res = await api.patch(`/package/status/pickup/${id}`)
  return res
}