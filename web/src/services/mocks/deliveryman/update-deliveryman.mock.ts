/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
export const updateDeliverymanMock = http.put(
  '/deliveryman/lorem-id-1',
  async () => {
    return new HttpResponse(null, { status: 200 })
  },
)