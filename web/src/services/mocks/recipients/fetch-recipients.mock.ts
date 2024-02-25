/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
export const fetchRecipientMock = http.get(
  '/recipients',
  async () => {
    return HttpResponse.json([
      {
        id: 'lorem-id-1',
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        documentNumber: '12345678900',
        name: 'lorem-name'
      },
      {
        id: 'lorem-id-2',
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        documentNumber: '12345678911',
        name: 'lorem-name-2'
      }
    ], { status: 200 })
  },
)