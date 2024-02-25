import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { FetchRecipientsUseCase } from "src/domain/delivery/application/use-cases/fetch-recipients";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";

import { DeliverymanPresenter } from "../../presenters/deliveryman-presenter";
import { RecipientPresenter } from "../../presenters/recipient-presenter";

@Controller('/recipients')
export class FetchRecipientsController {
  constructor(private fetchRecipients: FetchRecipientsUseCase) { }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@CurrentUser() user) {
    const { recipients } = await this.fetchRecipients.execute({
      adminId: user.sub
    })

    return recipients.map( i => RecipientPresenter.toHTTP(i))
  }
}