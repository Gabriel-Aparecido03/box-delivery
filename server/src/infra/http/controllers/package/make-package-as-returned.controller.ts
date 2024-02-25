import { Body, Controller, HttpCode, Param, Patch, UseGuards } from "@nestjs/common";
import { MakePackageReturnedUseCase } from "src/domain/delivery/application/use-cases/make-package-as-returned";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";
import { z } from "zod";



const paramSchema = z.object({
  id: z.string()
})

type paramType = z.infer<typeof paramSchema>

@Controller('/package/status/returned/:id')
export class MakePackageAsReturnedController {
  constructor(private makePackageAsReturned: MakePackageReturnedUseCase) { }

  @Patch()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType, @CurrentUser() user) {

    const { id } = paramSchema.parse(param)

    await this.makePackageAsReturned.execute({
      packageId: id,
      deliverymanId: user.sub
    })
  }
}