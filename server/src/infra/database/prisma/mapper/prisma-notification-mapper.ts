import { Notification as NotificationPrisma , Prisma } from "@prisma/client";
import { UniqueEntityID } from "src/domain/core/unique-entity-id";
import { Notification } from "src/domain/notification/enterprise/entities/notification";

export class PrismaNotificationMapper {
  toDomain(raw : NotificationPrisma) {
    return Notification.create({
      content : raw.content,
      recipientId : new UniqueEntityID(raw.user_id),
      title : raw.title,
      readAt : raw.readAt,
      createdAt : raw.createdAt
    }, new UniqueEntityID(raw.id)
    )
  }

  toPrisma(notification : Notification ) : Prisma.NotificationUncheckedCreateInput { 
    return {
      content : notification.content,
      title : notification.title,
      user_id : notification.recipientId.toString(),
      createdAt : notification.createdAt,
      id : notification.id.toString(),
      readAt : notification.readAt,
    }
  }
}