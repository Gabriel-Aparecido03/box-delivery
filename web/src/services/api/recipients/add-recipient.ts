import { api } from "../../../lib/axios"

interface AddRecipientParamsType {
  latitude: number
  longitude: number
  name: string
  documentNumber: string
}

export async function addRecipient({ documentNumber, latitude, longitude, name }: AddRecipientParamsType) {
  await api.post(`/recipient`, {
    documentNumber,
    latitude,
    longitude,
    name,
  })
}