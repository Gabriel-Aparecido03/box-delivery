import { UniqueEntityID } from "src/domain/core/unique-entity-id";
import { Status } from "./value-object/status";
import { Entity } from "src/domain/core/entity";
import { Optional } from "src/domain/core/types/optional";
import { Coordinate } from "./value-object/coordinate";
import { PackageAttachmentsList } from "./package-attachments-list";
import { AggregateRoot } from "src/domain/core/aggregate-root";
import { stat } from "fs";
import { OnStatusChangedEvent } from "../events/on-status-changed-event";

export interface PackagePropsType {
  recipientId: UniqueEntityID
  deliveryManId: UniqueEntityID
  coordinates: Coordinate
  status: Status
  createdAt: Date
  updatedAt?: Date | null
}

export class Package extends AggregateRoot<PackagePropsType> {

  get recipientId() {
    return this.props.recipientId
  }

  get deliveryManId() {
    return this.props.deliveryManId
  }

  get coordinates() {
    return this.props.coordinates
  }

  get status() {
    return this.props.status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set recipientId(recipientId: UniqueEntityID) {
    this.props.recipientId = recipientId
  }

  set deliveryManId(deliveryManId: UniqueEntityID) {
    this.props.deliveryManId = deliveryManId
  }

  set status(status: Status) {
    this.props.status = status
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }

  set coordinates(coordinate: Coordinate) {
    this.props.coordinates = coordinate
  }


  static create(props: Optional<PackagePropsType, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID) {
    const packageOrder = new Package({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null
    }, id)

    if(packageOrder.status.value.status !== "waiting-for-delivery") {
      packageOrder.addDomainEvent(new OnStatusChangedEvent(packageOrder))
    }

    return packageOrder
  }
}