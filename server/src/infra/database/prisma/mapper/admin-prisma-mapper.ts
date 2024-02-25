import { Prisma, User } from "@prisma/client";
import { UniqueEntityID } from "src/domain/core/unique-entity-id";
import { Admin } from "src/domain/delivery/enterprise/entities/admin";
import { Coordinate } from "src/domain/delivery/enterprise/entities/value-object/coordinate";
import { DocumentNumber } from "src/domain/delivery/enterprise/entities/value-object/document-number";

export class PrismaAdminMapper {
  toDomain(raw:User) {
    if(!raw) return null
    return Admin.create({
      coordinate : Coordinate.create({ latitude : raw.latitude, longitude : raw.longitude}),
      documentNumber : DocumentNumber.create(raw.documentNumber),
      name : raw.name,
      password : raw.password,
      createdAt : raw.createdAt,
      updatedAt : raw.updatedAt,
    },new UniqueEntityID(raw.id))
  }

  toPrisma(raw: Admin): Prisma.UserUncheckedCreateInput {
    return {
      documentNumber : raw.documentNumber.value,
      latitude : raw.coordinate.latitude,
      longitude : raw.coordinate.longitude,
      name : raw.name,
      createdAt: raw.createdAt,
      id : raw.id.toString(),
      password: raw.password,
      updatedAt : raw.updatedAt,
      role : 'ADMIN',
    }
  }
}