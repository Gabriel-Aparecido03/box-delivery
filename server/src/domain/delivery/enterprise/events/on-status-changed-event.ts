import { DomainEvent } from "src/domain/core/events/domain-event";
import { UniqueEntityID } from "src/domain/core/unique-entity-id";
import { Package } from "../entities/package";

export class OnStatusChangedEvent implements DomainEvent {
  ocurredAt: Date;
  public packageOrder: Package

  constructor(packageOrder : Package ) {
    this.packageOrder = packageOrder
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.packageOrder.id
  }
}