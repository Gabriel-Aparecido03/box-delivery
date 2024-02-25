import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthenticateDeliverymanUseCase } from "src/domain/delivery/application/use-cases/authenticate-deliveryman";
import { z } from "zod";

const bodySchemaValidation = z.object({
  documentNumber : z.string(),
  password : z.string()
})

type bodyType = z.infer<typeof bodySchemaValidation>

@Controller('/session/deliveryman/authenticate')
export class AuthtenticateDeliverymanController {
  constructor(private authenticateDeliveryman : AuthenticateDeliverymanUseCase ) {}

  @Post()
  @HttpCode(200)
  async handle(@Body() body : bodyType ) {
    const { documentNumber , password } = bodySchemaValidation.parse(body)
    const result = await this.authenticateDeliveryman.execute({ documentNumber , password })
    return result
  }
}