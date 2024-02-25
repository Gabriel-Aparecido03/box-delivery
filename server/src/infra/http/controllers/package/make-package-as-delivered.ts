import { Body, Controller, HttpCode, Param, Patch, UseGuards } from "@nestjs/common";
import { MakePackageAsDeliveredUseCase } from "src/domain/delivery/application/use-cases/make-package-as-delivered";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";
import { z } from "zod";

const bodySchema = z.object({
  deliverymanId: z.string().uuid(),
  attachmentsIds: z.array(z.string())
})

type bodyType = z.infer<typeof bodySchema>

const paramSchema = z.object({
  id: z.string().uuid()
})

type paramType = z.infer<typeof paramSchema>


@Controller('/package/status/delivered/:id')
export class MakePackageAsDeliveredController {
  constructor(private makePackageAsDelivered: MakePackageAsDeliveredUseCase) { }

  @Patch()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType, @CurrentUser() user) {

    const { id } = paramSchema.parse(param)

    await this.makePackageAsDelivered.execute({
      packageId: id,
      deliverymanId : user.sub
    })
  }
}