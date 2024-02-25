import { Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { GetByIdDeliverymanUseCase } from "src/domain/delivery/application/use-cases/get-by-id-deliveryman";
import { AuthGuard } from "src/infra/auth/auth.guard";

import { z } from "zod";
import { DeliverymanPresenter } from "../../presenters/deliveryman-presenter";

const paramSchema = z.object({
  id: z.string().uuid()
})

type paramType = z.infer<typeof paramSchema>

@Controller('/deliveryman/:id')
export class GetByIdDeliverymanController {
  constructor(private getByIdDeliveryman: GetByIdDeliverymanUseCase) { }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType) {
    const { id } = paramSchema.parse(param)
    const { deliveryman } = await this.getByIdDeliveryman.execute({
      deliverymanId: id
    })

    return DeliverymanPresenter.toHTTP(deliveryman)
  }
}