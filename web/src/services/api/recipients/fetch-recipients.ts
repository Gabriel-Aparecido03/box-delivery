import { Recipient } from "../../../interfaces/recipient";
import { api } from "../../../lib/axios";

export async function fetchRecpients() {
  const res = await api.get<Recipient[]>(`/recipients`)
  return res
}