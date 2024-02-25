import { api } from "../../../lib/axios";

export async function changeDeliverymanPassword({ id , password }:{ id : string , password : string}) {
  const res = await api.patch(`/deliveryman/password/${id}`,{ password })
  return res
}