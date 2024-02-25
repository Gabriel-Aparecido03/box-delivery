import { UniqueEntityID } from 'src/domain/core/unique-entity-id'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notification-repository'
import { Injectable } from '@nestjs/common'

export interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest) {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })
    await this.notificationsRepository.create(notification)

    return {
      notification,
    }
  }
}