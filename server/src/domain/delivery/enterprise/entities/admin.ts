import { Entity } from "src/domain/core/entity"
import { Optional } from "src/domain/core/types/optional"
import { UniqueEntityID } from "src/domain/core/unique-entity-id"
import { Coordinate } from "./value-object/coordinate"
import { DocumentNumber } from "./value-object/document-number"

export interface AdminPropsType {
  name : string
  documentNumber : DocumentNumber
  password : string
  coordinate : Coordinate
  createdAt : Date
  updatedAt : Date
}

export class Admin extends Entity<AdminPropsType> {

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

  set name(name : string) {
    this.props.name = name
    this.props.updatedAt = new Date()
  }

  set documentNumber(documentNumber : DocumentNumber) {
    this.props.documentNumber = documentNumber
    this.props.updatedAt = new Date()
  }

  set password(password : string) {
    this.props.password = password
    this.props.updatedAt = new Date()
  }

  set coordinate(coordinate : Coordinate) {
    this.props.coordinate = coordinate
    this.props.updatedAt = new Date()
  }

  set createdAt(createdAt : Date) {
    this.props.createdAt = createdAt
  }

  set updatedAt(updatedAt : Date) {
    this.props.updatedAt = updatedAt
  }

  static create(props : Optional<AdminPropsType, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID ) {
    const admin = new Admin({
      ...props,
      createdAt : props.createdAt ?? new Date(),
      updatedAt : props.updatedAt ?? null
    },id)

    return admin
  }
}