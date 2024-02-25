import { api } from "../../../lib/axios"

export async function makePackageAsReturned({ id }:{ id : string}) {
  const res = await api.patch(`/package/status/returned/${id}`)
  return res
}