import { api } from "../../../lib/axios"

export async function deletePackagesById({ id }:{ id : string}) {
  const res = await api.delete(`/package/${id}`)
  return res
}