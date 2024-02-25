import { Body, Controller, HttpCode, Param, Put, UseGuards } from "@nestjs/common";
import { UpdateRecipientUseCase } from "src/domain/delivery/application/use-cases/update-recipient";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";

import { z } from "zod";

const paramSchema = z.object({
  id: z.string()
})

type paramType = z.infer<typeof paramSchema>

const bodySchema = z.object({
  documentNumber: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  name: z.string()
})

type bodyType = z.infer<typeof bodySchema>

@Controller('/recipient/:id')
export class UpdateRecipientController {
  constructor(private updateRecipient: UpdateRecipientUseCase) { }

  @Put()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType, @CurrentUser() user, @Body() body: bodyType) {
    const { id } = paramSchema.parse(param)
    const { documentNumber, latitude, longitude, name } = bodySchema.parse(body)
    await this.updateRecipient.execute({
      adminId: user.sub,
      coordinate: { latitude, longitude },
      documentNumber,
      recipientId: id,
      name
    })
  }
}