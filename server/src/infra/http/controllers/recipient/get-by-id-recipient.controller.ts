import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { GetByIdRecipientUseCase } from "src/domain/delivery/application/use-cases/get-by-id-recipient";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";

import { z } from "zod";
import { RecipientPresenter } from "../../presenters/recipient-presenter";

const paramSchema = z.object({
  id: z.string()
})

type paramType = z.infer<typeof paramSchema>

@Controller('/recipient/:id')
export class GetByIdRecipientController {
  constructor(private getByIdRecipient: GetByIdRecipientUseCase) { }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType, @CurrentUser() user) {
    const { id } = paramSchema.parse(param)

    const { recipient } = await this.getByIdRecipient.execute({
      recipientId: id
    })

    return RecipientPresenter.toHTTP(recipient)
  }
}