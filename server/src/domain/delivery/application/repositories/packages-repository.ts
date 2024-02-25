import { Injectable } from "@nestjs/common";
import { Package } from "../../enterprise/entities/package";
import { CoordinateType } from "../../enterprise/entities/value-object/coordinate";
import { PackageWithDetails } from "../../enterprise/entities/value-object/package-wtih-details";

export interface fetchPackagesNear {
  deliverymanId : string
  coordinates : CoordinateType
}

@Injectable()
export abstract class PackageRepository {
  abstract create(packageOrder: Package): Promise<void>
  abstract getByID(id: string): Promise<PackageWithDetails>
  abstract update(packageOrder: Package): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract changeStatusToDelivered(packageOrder: Package): Promise<void>
  abstract changeStatusToPickUp(packageOrder: Package): Promise<void>
  abstract changeStatusReturned(packageOrder: Package): Promise<void>
  abstract fetchPackagesNear(params : fetchPackagesNear): Promise<PackageWithDetails[]>
  abstract fetchAllPackagesOfDeliveryman(deliverymanId: string): Promise<PackageWithDetails[]>
  abstract fetchAllPackagesOfRecipient(recipientId: string): Promise<PackageWithDetails[]>
  abstract fetchAllPackages(): Promise<PackageWithDetails[]>
}