/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
export const meMocking = http.get(
  '/session/me',
  async () => {
    return HttpResponse.json({
      id: 'lorem-name',
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      documentNumber: '12345678900',
      name: 'lorem-name'
    },{ status : 200 })
  },
)