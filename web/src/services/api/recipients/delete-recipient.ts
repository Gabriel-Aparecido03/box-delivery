import { Recipient } from "../../../interfaces/recipient";
import { api } from "../../../lib/axios";

export async function deleteRecipientById({ id }:{ id : string}) {
  const res = await api.delete<Recipient>(`/recipient/${id}`)
  return res
}