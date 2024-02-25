import { Optional } from "@prisma/client/runtime/library"
import { AggregateRoot } from "src/domain/core/aggregate-root"
import { UniqueEntityID } from "src/domain/core/unique-entity-id"
import { OnStatusChangedEvent } from "../../events/on-status-changed-event"
import { PackageAttachmentsList } from "../package-attachments-list"
import { Coordinate } from "./coordinate"
import { Status } from "./status"
import { Package } from "../package"
import { ValueObject } from "src/domain/core/value-object"


export interface PackagePropsType {
  id : UniqueEntityID
  recipientName : string
  recipientId: UniqueEntityID
  deliveryManId: UniqueEntityID
  deliverymanName : string
  coordinates: Coordinate
  status: Status
  createdAt: Date
  updatedAt?: Date | null
}

export class PackageWithDetails extends ValueObject<PackagePropsType> {

  get recipientId() {
    return this.props.recipientId
  }

  get id() {
    return this.props.id
  }

  get recipientName() {
    return this.props.recipientName
  }

  get deliveryManId() {
    return this.props.deliveryManId
  }

  get deliverymanName() {
    return this.props.deliverymanName
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
    const packageOrder = new PackageWithDetails({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null
    })

    return packageOrder
  }
}