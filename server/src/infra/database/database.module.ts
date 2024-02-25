import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { AdminRepository } from "src/domain/delivery/application/repositories/admin-repository";
import { PrismaAdminRepository } from "./prisma/repositories/prisma-admin-repository";
import { DeliverymanRepository } from "src/domain/delivery/application/repositories/deliveryman-repository";
import { PrismaDeliverymanRepository } from "./prisma/repositories/prisma-deliveryman-repository";
import { RecipientRepository } from "src/domain/delivery/application/repositories/recipient-repository";
import { PrismaRecipientRepository } from "./prisma/repositories/prisma-recipient-repository";
import { PackageRepository } from "src/domain/delivery/application/repositories/packages-repository";
import { PrismaPackagesRepository } from "./prisma/repositories/prisma-packages-repository";
import { NotificationsRepository } from "src/domain/notification/application/repositories/notification-repository";
import { PrismaNotificationRepository } from "./prisma/repositories/prisma-notification-repository";

@Module({
  imports : [],
  providers : [
    PrismaService,
    {
      provide : AdminRepository,
      useClass : PrismaAdminRepository
    },
    {
      provide : DeliverymanRepository,
      useClass : PrismaDeliverymanRepository
    },
    {
      provide : RecipientRepository,
      useClass : PrismaRecipientRepository
    },
    {
      provide : PackageRepository,
      useClass : PrismaPackagesRepository
    },
    {
      provide : NotificationsRepository,
      useClass : PrismaNotificationRepository
    },
  ],
  exports : [
    PrismaService, 
    AdminRepository,
    DeliverymanRepository,
    PackageRepository,
    NotificationsRepository,
    RecipientRepository
  ]
})
export class DatabaseModule {}