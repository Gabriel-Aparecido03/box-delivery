import { Injectable } from "@nestjs/common";
import { Coordinate, CoordinateType } from "../../enterprise/entities/value-object/coordinate";
import { Status, StatusType } from "../../enterprise/entities/value-object/status";
import { AdminRepository } from "../repositories/admin-repository";
import { PackageRepository } from "../repositories/packages-repository";
import { NotAllowed } from "./errors/not-allowed";
import { ResourceNotFound } from "./errors/resource-not-found";
import { Package } from "../../enterprise/entities/package";

interface PackageUseCasePropsType {
  adminId: string
  coordinates: CoordinateType
  packageId: string
}

@Injectable()
export class UpdatePackageUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private packageRepository: PackageRepository,
  ) { }

  async execute({ adminId, coordinates, packageId }: PackageUseCasePropsType) {

    const hasAdmin = await this.adminRepository.getByID(adminId)
    if (!hasAdmin) throw new NotAllowed()

    const packageOrder = await this.packageRepository.getByID(packageId)
    if (!packageOrder) throw new ResourceNotFound()

    packageOrder.coordinates = Coordinate.create(coordinates)

    await this.packageRepository.update(Package.create({
      coordinates: packageOrder.coordinates,
      deliveryManId: packageOrder.deliveryManId,
      recipientId: packageOrder.recipientId,
      status: packageOrder.status,
      createdAt: packageOrder.createdAt,
      updatedAt: packageOrder.updatedAt
    }, packageOrder.id))
  }
} 