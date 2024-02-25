import { Entity } from "src/domain/core/entity"
import { Optional } from "src/domain/core/types/optional"
import { UniqueEntityID } from "src/domain/core/unique-entity-id"
import { Coordinate } from "./value-object/coordinate"
import { DocumentNumber } from "./value-object/document-number"

export interface RecipientPropsType {
  name : string
  coordinate : Coordinate
  documentNumber : DocumentNumber
  createdAt : Date
  updatedAt : Date
}

export class Recipient extends Entity<RecipientPropsType> {

  get name() {
    return this.props.name
  }

  get documentNumber() {
    return this.props.documentNumber
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


  set name(name : string) {
    this.props.name = name
    this.touch()
  }

  set documentNumber(documentNumber : DocumentNumber) {
    this.props.documentNumber = documentNumber
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

  touch() {
    this.updatedAt = new Date()
  }

  static create(props : Optional<RecipientPropsType, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID ) {
    const recipient = new Recipient({
      ...props,
      createdAt : props.createdAt ?? new Date(),
      updatedAt : props.updatedAt ?? null
    },id)

    return recipient
  }
}