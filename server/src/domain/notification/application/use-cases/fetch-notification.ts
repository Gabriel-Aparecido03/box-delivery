import { Injectable } from "@nestjs/common"
import { NotificationsRepository } from "../repositories/notification-repository"

interface ReadNotificationProps {
  receipentId : string
}

@Injectable()
export class FetchNotificationUseCase {
  constructor(private notificationRepository : NotificationsRepository) {}

  async execute({receipentId} : ReadNotificationProps) {
    const notifications = await this.notificationRepository.findByRecipientId(receipentId)
    return { notifications }
  }
}