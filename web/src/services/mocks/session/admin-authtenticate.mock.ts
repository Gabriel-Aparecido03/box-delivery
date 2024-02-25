/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
export const adminAuthenticateWithMocking = http.post(
  '/session/admin/authenticate',
  async ({ request }) => {
    const { documentNumber } = await request.json() as any

    if (documentNumber === '12345678900') {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          'Set-Cookie': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiREVMSVZFUllNQU4ifQ.NbAkk2Kj9dCvNEaq3p8SeEhaxLsAFt1T2VSfiq2Yss4',
        },
      })
    }

    return new HttpResponse(null, { status: 401 })
  },
)