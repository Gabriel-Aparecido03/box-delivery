import { Body, Controller, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { RegisterPackageUseCase } from "src/domain/delivery/application/use-cases/register-package";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";
import { z } from "zod";

const bodySchema = z.object({
  deliverymanId: z.string(),
  recipientId: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

type bodyType = z.infer<typeof bodySchema>

@Controller('/package')
export class RegisterPackageController {
  constructor(private registerPackage: RegisterPackageUseCase) { }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async handle( @Body() body: bodyType, @CurrentUser() user) {

    const { deliverymanId, latitude, longitude, recipientId } = bodySchema.parse(body)

    const coordinates = latitude & longitude ? { latitude, longitude } : null

    await this.registerPackage.execute({
      adminId : user.sub,
      deliverymanId,
      recipientId,
      coordinates
    })
  }
}