import { Body, Controller, Delete, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { DeleteRecipientUseCase } from "src/domain/delivery/application/use-cases/delete-recipient";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser, UserPayload } from "src/infra/auth/current-user";

import { z } from "zod";

const paramSchema = z.object({
  id : z.string()
})

type paramType = z.infer<typeof paramSchema>

@Controller('/recipient/:id')
export class DeleteRecipientController {
  constructor(private deleteRecipient: DeleteRecipientUseCase) { }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType, @CurrentUser() user) {
    const { id } = paramSchema.parse(param)

    await this.deleteRecipient.execute({
      adminId : user.sub,
      recipientId : id
    })

  }
}