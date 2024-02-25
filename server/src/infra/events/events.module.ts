import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { SendNotificationUseCase } from "src/domain/notification/application/use-cases/send-notification";
import { OnStatusChanged } from "src/domain/notification/application/subscribers/on-status-change";

@Module({
  imports : [ DatabaseModule],
  providers : [
    SendNotificationUseCase,
    OnStatusChanged
  ]
})
export class EventsModule {}