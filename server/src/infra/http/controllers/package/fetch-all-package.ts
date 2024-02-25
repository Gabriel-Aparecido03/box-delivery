import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { FetchPackagesUseCase } from "src/domain/delivery/application/use-cases/fetch-all-packages";
import { FetchPackageOfRecipientUseCase } from "src/domain/delivery/application/use-cases/fetch-my-packages-recipient";
import { FetchPackageNearOfDeliverymanUseCase } from "src/domain/delivery/application/use-cases/fetch-package-near-of-deliveryman";
import { GetStatusOfPackageUseCase } from "src/domain/delivery/application/use-cases/get-status-by-package-code";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";
import { z } from "zod";
import { PackageWithDetailsPresenter } from "../../presenters/package-details-presenter";

@Controller('/packages')
export class FetchPackageController {
  constructor(private fetchPackageOfRecipient: FetchPackagesUseCase) { }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@CurrentUser() user) {

    const { packages } = await this.fetchPackageOfRecipient.execute({ adminId : user.sub })
    return packages.map( i => PackageWithDetailsPresenter.toHTTP(i))
  }
}