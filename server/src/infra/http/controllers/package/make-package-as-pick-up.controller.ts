import { Body, Controller, HttpCode, Param, Patch, UseGuards } from "@nestjs/common";
import { MakePackagePickUpUseCase } from "src/domain/delivery/application/use-cases/make-package-as-pick-up";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";
import { z } from "zod";

type bodyType = z.infer<typeof bodySchema>

const paramSchema = z.object({
  id: z.string()
})

type paramType = z.infer<typeof paramSchema>


@Controller('/package/status/pickup/:id')
export class MakePackageAsPickUpController {
  constructor(private makePackageAsPickUp: MakePackagePickUpUseCase) { }

  @Patch()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType, @CurrentUser() user) {

    const { id } = paramSchema.parse(param)

    await this.makePackageAsPickUp.execute({
      packageId: id,
      deliverymanId : user.sub
    })
  }
}