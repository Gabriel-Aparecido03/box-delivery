import { api } from "../../../lib/axios"

interface RegisterPackageType {
  deliverymanId: string
  recipientId: string
  latitude: number
  longitude: number
}

export async function registerPackage({ deliverymanId, latitude, longitude, recipientId }: RegisterPackageType) {
  await api.post(`/package`, {
    deliverymanId,
    latitude,
    longitude,
    recipientId
  })
}