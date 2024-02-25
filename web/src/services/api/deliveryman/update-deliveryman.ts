import { api } from "../../../lib/axios"

interface UpdateDeliverymanParamsType {
  latitude: number
  longitude: number
  name: string
  documentNumber: string
  id: string
}

export async function updateDeliveryman({ documentNumber, id, latitude, longitude, name }: UpdateDeliverymanParamsType) {
  await api.put(`/deliveryman/${id}`, {
    documentNumber,
    latitude,
    longitude,
    name
  })
}