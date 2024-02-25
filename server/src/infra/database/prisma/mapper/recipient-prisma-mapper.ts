import { Prisma, User } from "@prisma/client";
import { UniqueEntityID } from "src/domain/core/unique-entity-id";
import { Recipient } from "src/domain/delivery/enterprise/entities/recipient";
import { Coordinate } from "src/domain/delivery/enterprise/entities/value-object/coordinate";
import { DocumentNumber } from "src/domain/delivery/enterprise/entities/value-object/document-number";

export class PrismaRecipientMapper {
  toDomain(raw:User) {
    if(!raw) return null
    return Recipient.create({
      coordinate : Coordinate.create({ latitude : raw.latitude, longitude : raw.longitude}),
      documentNumber : DocumentNumber.create(raw.documentNumber),
      name : raw.name,
      createdAt : raw.createdAt,
      updatedAt : raw.updatedAt,
    },new UniqueEntityID(raw.id))
  }

  toPrisma(raw: Recipient): Prisma.UserUncheckedCreateInput {
    return {
      documentNumber : raw.documentNumber.value,
      latitude : raw.coordinate.latitude,
      longitude : raw.coordinate.longitude,
      name : raw.name,
      createdAt: raw.createdAt,
      id : raw.id.toString(),
      updatedAt : raw.updatedAt,
      role : 'RECIPIENT',
    }
  }
}