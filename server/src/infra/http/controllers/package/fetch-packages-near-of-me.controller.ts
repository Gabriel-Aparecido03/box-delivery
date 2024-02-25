import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { FetchPackageOfRecipientUseCase } from "src/domain/delivery/application/use-cases/fetch-my-packages-recipient";
import { FetchPackageNearOfDeliverymanUseCase } from "src/domain/delivery/application/use-cases/fetch-package-near-of-deliveryman";
import { GetStatusOfPackageUseCase } from "src/domain/delivery/application/use-cases/get-status-by-package-code";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";
import { z } from "zod";
import { PackageWithDetailsPresenter } from "../../presenters/package-details-presenter";

const paramSchema = z.object({
  id: z.string().uuid()
})

type paramType = z.infer<typeof paramSchema>


@Controller('/package/near-of-me')
export class FetchPackageNearOfMeController {
  constructor(private fetchPackageOfRecipient: FetchPackageNearOfDeliverymanUseCase) { }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@CurrentUser() user) {

    const { packages } = await this.fetchPackageOfRecipient.execute({
      deliverymanId: user.sub
    })
    return packages.map(i => PackageWithDetailsPresenter.toHTTP(i))
  }
}