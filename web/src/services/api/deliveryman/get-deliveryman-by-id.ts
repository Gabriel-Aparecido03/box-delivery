import { Deliveryman } from "../../../interfaces/deliveryman";
import { api } from "../../../lib/axios";

export async function getDeliverymanById({ id }:{ id : string}) {
  const res = await api.get<Deliveryman>(`/deliveryman/${id}`)
  return res
}