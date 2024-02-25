import { api } from "../../../lib/axios"

interface DeliverymanAuthtenticateParamsType {
  documentNumber : string
  password : string
}

export async function deliverymanAuthenticate({ documentNumber ,password  }:DeliverymanAuthtenticateParamsType) {
  const res = await api.post('/session/deliveryman/authenticate',{ documentNumber , password })
  return res
}