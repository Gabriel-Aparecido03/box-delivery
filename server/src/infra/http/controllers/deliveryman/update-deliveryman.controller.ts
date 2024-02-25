import { Body, Controller, HttpCode, Param, Put, UseGuards } from "@nestjs/common";
import { UpdateDeliverymanUseCase } from "src/domain/delivery/application/use-cases/update-deliveryman";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";

import { z } from "zod";

const paramSchema = z.object({
  id: z.string()
})

const bodySchema = z.object({
  documentNumber: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  name : z.string()
})

type bodyType = z.infer<typeof bodySchema>

type paramType = z.infer<typeof paramSchema>

@Controller('/deliveryman/:id')
export class UpdateliverymanController {
  constructor(private updateliveryman: UpdateDeliverymanUseCase) { }

  @Put()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType, @Body() body: bodyType, @CurrentUser() user) {
    const { id } = paramSchema.parse(param)
    const { documentNumber, latitude, longitude , name } = bodySchema.parse(body)
    await this.updateliveryman.execute({
      adminId: user.sub,
      deliverymanId: id,
      coordinate: { latitude, longitude },
      documentNumber,
      name
    })

  }
}