import { $Enums, Prisma, Package as PrismaPackage, Status as PrismaStatus, User as PrismaUser } from "@prisma/client";
import { UniqueEntityID } from "src/domain/core/unique-entity-id";
import { Package } from "src/domain/delivery/enterprise/entities/package";
import { Coordinate } from "src/domain/delivery/enterprise/entities/value-object/coordinate";
import { PackageWithDetails } from "src/domain/delivery/enterprise/entities/value-object/package-wtih-details";
import { Status, StatusType } from "src/domain/delivery/enterprise/entities/value-object/status";

interface rawWithDetails {
  id: string;
  latitude: number;
  longitude: number;
  deliverymanId: string;
  recipientId: string;
  status: $Enums.Status;
  createdAt: Date;
  updatedAt: Date;
  deliveryman: {
    id: string;
    name: string;
    documentNumber: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    latitude: number;
    longitude: number;
    role: $Enums.Role;
};
recipientID: {
    id: string;
    name: string;
    documentNumber: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    latitude: number;
    longitude: number;
    role: $Enums.Role;
};
}

export class PrismaPackageWithDetailsMapper {
  toDomain(raw: rawWithDetails) {
    if (!raw) return null
    const status = raw.status.toLowerCase().replaceAll('_', '-') as StatusType
    return PackageWithDetails.create({
      coordinates: Coordinate.create({ latitude: raw.latitude, longitude: raw.longitude }),
      deliveryManId: new UniqueEntityID(raw.deliverymanId),
      recipientId: new UniqueEntityID(raw.recipientId),
      status: Status.create({ changedAt: raw.updatedAt ?? raw.createdAt, status }),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deliverymanName: raw.deliveryman.name,
      id: new UniqueEntityID(raw.id),
      recipientName: raw.recipientID.name
    })
  }

  toPrisma(raw: Package): Prisma.PackageUncheckedCreateInput {
    const status = raw.status.value.status.toUpperCase().replaceAll('-', '_') as PrismaStatus
    return {
      deliverymanId: raw.deliveryManId.toString(),
      latitude: raw.coordinates.latitude,
      longitude: raw.coordinates.longitude,
      recipientId: raw.recipientId.toString(),
      status,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      id: raw.id.toString(),
    }
  }
}