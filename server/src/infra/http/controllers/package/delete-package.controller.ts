import { Body, Controller, Delete, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { DeletePackageUseCase } from "src/domain/delivery/application/use-cases/delete-package";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";
import { z } from "zod";

const bodySchema = z.object({
  deliverymanId: z.string().uuid(),
  recipientId: z.string().uuid(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

type bodyType = z.infer<typeof bodySchema>

const paramSchema = z.object({
  id : z.string().uuid()
})

type paramType = z.infer<typeof paramSchema>


@Controller('/package/:id')
export class DeletePackageController {
  constructor(private deletePackage: DeletePackageUseCase) { }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType, @CurrentUser() user) {

    const { id } = paramSchema.parse(param)

    await this.deletePackage.execute({
      adminId : user.sub,
      packageId : id 
    })
  }
}