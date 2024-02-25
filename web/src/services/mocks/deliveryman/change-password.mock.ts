/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
export const changePasswordDeliverymanMock = http.patch(
  '/deliveryman/password/lorem-id-1',
  async () => {
    return new HttpResponse(null, { status: 200 })
  },
)