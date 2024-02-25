import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { RegisterRecipientUseCase } from "src/domain/delivery/application/use-cases/register-recipient";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";

import { z } from "zod";

const bodySchema = z.object({
  documentNumber: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  name: z.string()
})

type bodyType = z.infer<typeof bodySchema>

@Controller('/recipient')
export class RegisterRecipientController {
  constructor(private registerRecipient: RegisterRecipientUseCase) { }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async handle(@Body() body: bodyType, @CurrentUser() user) {
    const { documentNumber, latitude, longitude, name } = bodySchema.parse(body)
    await this.registerRecipient.execute({
      adminId: user.sub ,
      coordinates : { latitude , longitude } ,
      documentNumber, 
      name ,
    })
  }
}