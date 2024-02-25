import { api } from "../../../lib/axios"

interface UpdateRecipientParamsType {
  latitude: number
  longitude: number
  name: string
  documentNumber: string
  id: string
}

export async function updateRecipient({ documentNumber, id, latitude, longitude, name }: UpdateRecipientParamsType) {
  await api.put(`/recipient/${id}`, {
    documentNumber,
    latitude,
    longitude,
    name
  })
}