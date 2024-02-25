import { Body, Controller, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UpdatePackageUseCase } from "src/domain/delivery/application/use-cases/update-package";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";
import { z } from "zod";

const bodySchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

type bodyType = z.infer<typeof bodySchema>

const paramSchema = z.object({
  id : z.string().uuid()
})

type paramType = z.infer<typeof paramSchema>


@Controller('/package/:id')
export class UpdatePackageController {
  constructor(private updatePackage: UpdatePackageUseCase) { }

  @Put()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType ,@Body() body: bodyType, @CurrentUser() user) {

    const { id } = paramSchema.parse(param)
    const { latitude, longitude } = bodySchema.parse(body)

    const coordinates = latitude & longitude ? { latitude, longitude } : null

    await this.updatePackage.execute({
      adminId : user.sub,
      coordinates,
      packageId : id 
    })
  }
}