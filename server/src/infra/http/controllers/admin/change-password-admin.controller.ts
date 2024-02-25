import { Body, Controller, HttpCode, Param, Patch, Put, UseGuards } from "@nestjs/common";
import { ChangeAdminPasswordUseCase } from "src/domain/delivery/application/use-cases/change-admin-password";
import { ChangeDeleverymanPasswordUseCase } from "src/domain/delivery/application/use-cases/change-deliveryman-password";
import { UpdateDeliverymanUseCase } from "src/domain/delivery/application/use-cases/update-deliveryman";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";

import { z } from "zod";

const paramSchema = z.object({
  id: z.string().uuid()
})

const bodySchema = z.object({
  password : z.string()
})

type bodyType = z.infer<typeof bodySchema>

type paramType = z.infer<typeof paramSchema>

@Controller('/admin/:id')
export class ChangePasswordAdminController {
  constructor(private changePasswordAdmin: ChangeAdminPasswordUseCase) { }

  @Patch()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType, @Body() body: bodyType, @CurrentUser() user) {
    const { id } = paramSchema.parse(param)
    const { password } = bodySchema.parse(body)
    await this.changePasswordAdmin.execute({
      adminId : id,
      password
    })
  }
}