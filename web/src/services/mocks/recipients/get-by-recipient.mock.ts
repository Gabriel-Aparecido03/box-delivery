/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
export const getByRecipientMock = http.get(
  '/recipient/lorem-id-1',
  async () => {
    return HttpResponse.json({
      id: 'lorem-id-1',
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      documentNumber: '12345678900',
      name: 'lorem-name'
    }, { status: 200 })
  },
)