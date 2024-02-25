import { Recipient } from "../../../interfaces/recipient";
import { api } from "../../../lib/axios";

export async function getRecipientById({ id }:{ id : string}) {
  const res = await api.get<Recipient>(`/recipient/${id}`)
  return res
}