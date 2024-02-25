import { Prisma, User } from "@prisma/client";
import { UniqueEntityID } from "src/domain/core/unique-entity-id";
import { Deliveryman } from "src/domain/delivery/enterprise/entities/deliveryman";
import { Coordinate } from "src/domain/delivery/enterprise/entities/value-object/coordinate";
import { DocumentNumber } from "src/domain/delivery/enterprise/entities/value-object/document-number";

export class PrismaDeliverymanMapper {
  toDomain(raw:User) {
    if(!raw) return null
    return Deliveryman.create({
      coordinate : Coordinate.create({ latitude : raw.latitude, longitude : raw.longitude}),
      documentNumber : DocumentNumber.create(raw.documentNumber),
      name : raw.name,
      password : raw.password,
      createdAt : raw.createdAt,
      updatedAt : raw.updatedAt,
    },new UniqueEntityID(raw.id))
  }

  toPrisma(raw: Deliveryman): Prisma.UserUncheckedCreateInput {
    return {
      documentNumber : raw.documentNumber.value,
      latitude : raw.coordinate.latitude,
      longitude : raw.coordinate.longitude,
      name : raw.name,
      createdAt: raw.createdAt,
      id : raw.id.toString(),
      password: raw.password,
      updatedAt : raw.updatedAt,
      role : 'DELIVERYMAN',
    }
  }
}