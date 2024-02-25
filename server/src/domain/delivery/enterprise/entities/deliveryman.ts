import { Entity } from "src/domain/core/entity"
import { Optional } from "src/domain/core/types/optional"
import { UniqueEntityID } from "src/domain/core/unique-entity-id"
import { DocumentNumber } from "./value-object/document-number"
import { Coordinate } from "./value-object/coordinate"

export interface DeliverymanPropsType {
  name : string
  documentNumber : DocumentNumber
  password : string
  coordinate : Coordinate
  createdAt : Date
  updatedAt : Date
}

export class Deliveryman extends Entity<DeliverymanPropsType> {

  get name() {
    return this.props.name
  }

  get documentNumber() {
    return this.props.documentNumber
  }

  get password() {
    return this.props.password
  }

  get coordinate() {
    return this.props.coordinate
  }

  get createdAt() {
    return this.props.createdAt 
  }

  get updatedAt() {
    return this.props.updatedAt
  }


  touch() {
    this.updatedAt = new Date()
  }

  set documentNumber(documentNumber : DocumentNumber) {
    this.props.documentNumber = documentNumber
    this.touch()
  }

  set password(password : string) {
    this.props.password = password
    this.touch()
  }

  set name(name : string) {
    this.props.name = name
    this.touch()
  }

  set coordinate(coordinate : Coordinate) {
    this.props.coordinate = coordinate
    this.touch()
  }

  set createdAt(createdAt : Date) {
    this.props.createdAt = createdAt
  }

  set updatedAt(updatedAt : Date) {
    this.props.updatedAt = updatedAt
  }

  static create(props : Optional<DeliverymanPropsType, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID ) {
    const deliveryman = new Deliveryman({
      ...props,
      createdAt : props.createdAt ?? new Date(),
      updatedAt : props.updatedAt ?? null
    },id)

    return deliveryman
  }
}