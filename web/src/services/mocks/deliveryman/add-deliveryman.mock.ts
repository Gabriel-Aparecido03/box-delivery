/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
export const registerDeliverymanMock = http.post(
  '/session/deliveryman/register',
  async () => {
    return new HttpResponse(null, { status: 200 })
  },
)