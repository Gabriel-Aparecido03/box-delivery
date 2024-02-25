import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { FetchDeliverymansUseCase } from "src/domain/delivery/application/use-cases/fetch-deliverymans";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";

import { DeliverymanPresenter } from "../../presenters/deliveryman-presenter";

@Controller('/deliverymans')
export class FetchDeliverymansController {
  constructor(private fetchDeliverymans: FetchDeliverymansUseCase) { }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@CurrentUser() user) {
    const { deliverymans } = await this.fetchDeliverymans.execute({
      adminId: user.sub
    })

    return deliverymans.map( i => DeliverymanPresenter.toHTTP(i))
  }
}