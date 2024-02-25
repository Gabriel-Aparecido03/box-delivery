import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { FetchPackageOfRecipientUseCase } from "src/domain/delivery/application/use-cases/fetch-my-packages-recipient";
import { GetStatusOfPackageUseCase } from "src/domain/delivery/application/use-cases/get-status-by-package-code";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";
import { z } from "zod";

const paramSchema = z.object({
  id: z.string().uuid()
})

type paramType = z.infer<typeof paramSchema>


@Controller('/package/recipient/:id')
export class FetchPackageOfRecipientController {
  constructor(private fetchPackageOfRecipient: FetchPackageOfRecipientUseCase) { }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@Param() param: paramType) {

    const { id } = paramSchema.parse(param)

    const { packages } = await this.fetchPackageOfRecipient.execute({
      recipientId : id
    })

    return packages
  }
}