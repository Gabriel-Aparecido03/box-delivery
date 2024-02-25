/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
export const deleteRecipientMock = http.delete(
  '/recipient/lorem-id-1',
  async () => {
    return new HttpResponse(null, { status: 204 })
  },
)