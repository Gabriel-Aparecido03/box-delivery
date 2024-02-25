import { Controller, Get, UseGuards, HttpCode } from "@nestjs/common"
import { FetchNotificationUseCase } from "src/domain/notification/application/use-cases/fetch-notification"
import { AuthGuard } from "src/infra/auth/auth.guard"
import { CurrentUser } from "src/infra/auth/current-user"

@Controller('/notifications/')
export class FetchNotificationController {

  constructor(private fetchNotifications: FetchNotificationUseCase) { }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async handle(@CurrentUser() { user }) {
    const { notifications } = await this.fetchNotifications.execute({
      receipentId: user
    })

    return notifications
  }
}