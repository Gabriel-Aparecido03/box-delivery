import { Notification } from '../../enterprise/entities/notification'

export abstract class NotificationsRepository {
  abstract findByRecipientId(recipientId: string): Promise<Notification[]>
  abstract create(notification: Notification): Promise<void>
  abstract save(notification: Notification): Promise<void>
  abstract getById(id:string): Promise<Notification | null>
}