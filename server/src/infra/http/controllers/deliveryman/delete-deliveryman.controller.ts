import { Body, Controller, Delete, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { DeleteDeliverymanUseCase } from "src/domain/delivery/application/use-cases/delete-deliveryman";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser, UserPayload } from "src/infra/auth/current-user";

import { z } from "zod";

const paramSchema = z.object({
  id : z.string()
})

type paramType = z.infer<typeof paramSchema>

@Controller('/deliveryman/:id')
export class DeleteDeliverymanController {
  constructor(private deleteDeliveryman: DeleteDeliverymanUseCase) { }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType, @CurrentUser() user) {
    const { id } = paramSchema.parse(param)

    await this.deleteDeliveryman.execute({
      adminId : user.sub,
      deliverymanId : id
    })

  }
}