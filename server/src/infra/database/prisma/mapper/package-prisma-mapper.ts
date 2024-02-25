import { Prisma, Package as PrismaPackage , Status as PrismaStatus} from "@prisma/client";
import { UniqueEntityID } from "src/domain/core/unique-entity-id";
import { Package } from "src/domain/delivery/enterprise/entities/package";
import { Coordinate } from "src/domain/delivery/enterprise/entities/value-object/coordinate";
import { Status, StatusType } from "src/domain/delivery/enterprise/entities/value-object/status";

export class PrismaPackageMapper {
  toDomain(raw:PrismaPackage) {
    if(!raw) return null
    const status = raw.status.toLowerCase().replaceAll('_','-') as StatusType
    return Package.create({
      coordinates : Coordinate.create({ latitude : raw.latitude, longitude : raw.longitude}),
      deliveryManId : new UniqueEntityID(raw.deliverymanId),
      recipientId : new UniqueEntityID(raw.recipientId),
      status : Status.create({ changedAt : raw.updatedAt ?? raw.createdAt , status }),
      createdAt : raw.createdAt,
      updatedAt : raw.updatedAt
    },new UniqueEntityID(raw.id))
  }

  toPrisma(raw: Package): Prisma.PackageUncheckedCreateInput {
    const status = raw.status.value.status.toUpperCase().replaceAll('-','_') as PrismaStatus
    return {
      deliverymanId : raw.deliveryManId.toString(),
      latitude : raw.coordinates.latitude,
      longitude : raw.coordinates.longitude,
      recipientId : raw.recipientId.toString(),
      status,
      createdAt : raw.createdAt,
      updatedAt : raw.updatedAt,
      id : raw.id.toString()
    }
  }
}