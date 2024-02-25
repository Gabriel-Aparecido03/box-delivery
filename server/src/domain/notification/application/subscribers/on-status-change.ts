import { DomainEvents } from "src/domain/core/events/domain-events";
import { EventHandler } from "src/domain/core/events/event-handler";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { OnStatusChangedEvent } from "src/domain/delivery/enterprise/events/on-status-changed-event";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OnStatusChanged implements EventHandler {
  constructor( private sendNotification : SendNotificationUseCase ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewStatusChangeNotification.bind(this),
      OnStatusChangedEvent.name
    )
  }

  private async sendNewStatusChangeNotification({ packageOrder }: OnStatusChangedEvent) {
    await this.sendNotification.execute({
      content : `The status of your package is ${packageOrder.status.value}`,
      recipientId : packageOrder.recipientId.toString(),
      title : `The package ${packageOrder.id}`
    })
  }
}