import { Notification } from "src/domain/notification/enterprise/entities/notification";

export class NotificationPresenter {
  static toHTTP(notification : Notification) {
    return {
      content : notification.content,
      title : notification.title,
      readAt : notification.readAt,
      sendAt : notification.createdAt,
      id : notification.id.toString()
    }
  }
}