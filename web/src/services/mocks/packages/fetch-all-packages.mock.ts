/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
export const fetchAllPackagesMock = http.get(
  '/packages',
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
        status: {
          name: 'returned',
          updatedAt: new Date()
        },
        recipient: {
          name: 'lorem-name',
          id: 'lorem-id'
        },
        deliveryman: {
          name: 'lorem-name',
          id: 'lorem-id'
        }
      }
    ], { status: 200 })
  },
)