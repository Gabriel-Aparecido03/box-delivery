import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { RegisterDeliverymanUseCase } from "src/domain/delivery/application/use-cases/register-deliveryman";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";

import { z } from "zod";

const bodySchemaValidation = z.object({
  documentNumber: z.string(),
  password: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  name: z.string()
})

type bodyType = z.infer<typeof bodySchemaValidation>

@Controller('/session/deliveryman/register')
export class RegisterDeliverymanController {
  constructor(private registerDeliveryman: RegisterDeliverymanUseCase) { }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async handle(@Body() body: bodyType, @CurrentUser() user) {
    const { documentNumber, password, latitude, longitude, name } = bodySchemaValidation.parse(body)
    await this.registerDeliveryman.execute({
      adminId: user.sub,
      coordinates: { latitude, longitude },
      documentNumber: documentNumber,
      name,
      password
    })
  }
}