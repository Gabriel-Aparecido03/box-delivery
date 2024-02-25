import { Deliveryman } from "../../../interfaces/deliveryman";
import { api } from "../../../lib/axios";

export async function deleteDeliverymanById({ id }:{ id : string}) {
  const res = await api.delete<Deliveryman>(`/deliveryman/${id}`)
  return res
}