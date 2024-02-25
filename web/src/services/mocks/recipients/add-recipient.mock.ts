/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
export const addRecipientMock = http.post(
  '/recipient',
  async ({ request }) => {
    const { documentNumber, latitude,longitude, name } = await request.json() as any
    return new HttpResponse(null, { status: 200 })
  },
)