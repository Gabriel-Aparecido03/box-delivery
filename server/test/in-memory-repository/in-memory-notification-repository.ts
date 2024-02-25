import { NotificationsRepository } from "src/domain/notification/application/repositories/notification-repository";
import { Notification } from "../../src/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationRepository implements NotificationsRepository {
  
  public items: Notification[] = []

  async getById(id: string): Promise<Notification> {
    const find = this.items.find(x => x.id.toString() === id)
    return find ?? null
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const index = this.items.findIndex(item => item.id.equals(notification.id))
    this.items[index] = notification
  }

  async findByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = this.items.filter(x => x.recipientId.toString() === recipientId)
    return notifications
  }
}