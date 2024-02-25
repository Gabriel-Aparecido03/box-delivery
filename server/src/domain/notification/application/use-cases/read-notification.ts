
import { NotAllowed } from 'src/domain/delivery/application/use-cases/errors/not-allowed'
import { NotificationsRepository } from '../repositories/notification-repository'
import { ResourceNotFound } from 'src/domain/delivery/application/use-cases/errors/resource-not-found'
import { Injectable } from '@nestjs/common'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) { }

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest) {
    const notification =
      await this.notificationsRepository.getById(notificationId)

    if (!notification) {
      throw new ResourceNotFound()
    } 
    if (recipientId !== notification.recipientId.toString()) {
      throw new NotAllowed()
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return { notification }
  }
}