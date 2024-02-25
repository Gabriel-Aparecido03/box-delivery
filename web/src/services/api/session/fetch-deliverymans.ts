import { api } from "../../../lib/axios";

export async function fetchDeliverymans() {
  const res = await api.get('/deliverymans')
  return res
}