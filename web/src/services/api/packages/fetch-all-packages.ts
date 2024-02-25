import { Package } from "../../../interfaces/package";
import { api } from "../../../lib/axios";

export async function fetchAllPackages() {
  const res = await api.get<Package[]>(`/packages`)
  return res
}