import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { GetByIdAdminUseCase } from "src/domain/delivery/application/use-cases/get-by-id-admin";
import { GetByIdDeliverymanUseCase } from "src/domain/delivery/application/use-cases/get-by-id-deliveryman";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { CurrentUser } from "src/infra/auth/current-user";
import { AdminPresenter } from "../../presenters/admin-presenter";
import { DeliverymanPresenter } from "../../presenters/deliveryman-presenter";

@Controller('/session/me')
export class MeController {
  constructor(private getByIdAmin: GetByIdAdminUseCase, private getByIdDeliveryman: GetByIdDeliverymanUseCase) { }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@CurrentUser() user) {
    if (user.role === "ADMIN") {
      const { admin } = await this.getByIdAmin.execute({ adminId: user.sub })
      return AdminPresenter.toHTTP(admin)
    }
    const { deliveryman } = await this.getByIdDeliveryman.execute({ deliverymanId: user.sub })
    return DeliverymanPresenter.toHTTP(deliveryman)
  }
}