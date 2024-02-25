import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { RegisterAdminUseCase } from "src/domain/delivery/application/use-cases/register-admin";
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

@Controller('/session/admin/register')
export class RegisterAdminController {
  constructor(private registerAdmin: RegisterAdminUseCase) { }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async handle(@Body() body: bodyType, @CurrentUser() user) {
    const { documentNumber, password, latitude, longitude, name } = bodySchemaValidation.parse(body)
    await this.registerAdmin.execute({
      adminId: user.sub,
      coordinates: { latitude, longitude },
      documentNumber: documentNumber,
      name,
      password
    })
  }
}