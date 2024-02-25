/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
export const registerRecipientMock = http.post(
  '/package',
  async () => {
    return new HttpResponse(null, { status: 200 })
  },
)