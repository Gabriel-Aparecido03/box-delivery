import { api } from "../../../lib/axios"

interface UpdateDeliverymanParamsType {
  latitude: number
  longitude: number
  name: string
  documentNumber: string
  password: string
}

export async function addDeliveryman({ documentNumber, latitude, longitude, name, password }: UpdateDeliverymanParamsType) {
  await api.post(`/session/deliveryman/register`, {
    documentNumber,
    latitude,
    longitude,
    name,
    password
  })
}