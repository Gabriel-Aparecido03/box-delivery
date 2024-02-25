import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { GetStatusOfPackageUseCase } from "src/domain/delivery/application/use-cases/get-status-by-package-code";
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
  id: z.string().uuid()
})

type paramType = z.infer<typeof paramSchema>


@Controller('/package/status/:id')
export class GetStatusPackageController {
  constructor(private getStatusPackage: GetStatusOfPackageUseCase) { }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType) {

    const { id } = paramSchema.parse(param)

    const { status } = await this.getStatusPackage.execute({
      packageId: id
    })

    return status
  }
}