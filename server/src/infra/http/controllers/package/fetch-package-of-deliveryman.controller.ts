import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { FetchPackageOfDeliverymanUseCase } from "src/domain/delivery/application/use-cases/fetch-packages-of-deliveryman";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { z } from "zod";
import { PackageWithDetailsPresenter } from "../../presenters/package-details-presenter";
import { CurrentUser } from "src/infra/auth/current-user";

const paramSchema = z.object({
  id: z.string().uuid()
})

type paramType = z.infer<typeof paramSchema>


@Controller('/package/deliveryman')
export class FetchPackageOfDeliverymanController {
  constructor(private fetchPackageOfDeliveryman: FetchPackageOfDeliverymanUseCase) { }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@CurrentUser() user) {


    const { packages } = await this.fetchPackageOfDeliveryman.execute({
      deliverymanId: user.sub
    })

    return packages.map( i => PackageWithDetailsPresenter.toHTTP(i))
  }
}