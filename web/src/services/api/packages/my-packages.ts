import { Package } from "../../../interfaces/package";
import { api } from "../../../lib/axios";

export async function MyPackages() {
  const res = await api.get<Package[]>(`/package/deliveryman`)
  return res
}