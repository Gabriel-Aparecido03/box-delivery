import { Injectable } from "@nestjs/common";
import { PrismaNotificationMapper } from "../mapper/prisma-notification-mapper";
import { PrismaService } from "../prisma.service";
import { NotificationsRepository } from "src/domain/notification/application/repositories/notification-repository";
import { Notification } from "src/domain/notification/enterprise/entities/notification";


@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {

  constructor(private prismaService: PrismaService) { }

  async getById(id: string): Promise<Notification> {
    const result = await this.prismaService.notification.findUnique({
      where: {
        id
      }
    })

    return new PrismaNotificationMapper().toDomain(result)
  }

  async create(notification: Notification): Promise<void> {
    const data = new PrismaNotificationMapper().toPrisma(notification)
    await this.prismaService.notification.create({
      data
    })
  }

  async save(notification: Notification): Promise<void> {
    const data = new PrismaNotificationMapper().toPrisma(notification)
    await this.prismaService.notification.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async findByRecipientId(recipientId: string): Promise<Notification[]> {
    const result = await this.prismaService.notification.findMany({
      where: {
        user_id: recipientId
      }
    })

    return result.map(i => new PrismaNotificationMapper().toDomain(i))
  }
}