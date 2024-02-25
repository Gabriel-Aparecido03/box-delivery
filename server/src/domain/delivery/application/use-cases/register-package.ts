import { Injectable } from "@nestjs/common";
import { Package } from "../../enterprise/entities/package";
import { Coordinate, CoordinateType } from "../../enterprise/entities/value-object/coordinate";
import { Status } from "../../enterprise/entities/value-object/status";
import { AdminRepository } from "../repositories/admin-repository";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { PackageRepository } from "../repositories/packages-repository";
import { RecipientRepository } from "../repositories/recipient-repository";
import { NotAllowed } from "./errors/not-allowed";

interface RecipientPropsType {
  adminId: string
  deliverymanId: string
  recipientId: string
  coordinates?: CoordinateType
}

@Injectable()
export class RegisterPackageUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private adminRepository: AdminRepository,
    private packageRepository: PackageRepository,
    private deliverymanRepository: DeliverymanRepository
  ) { }

  async execute({ adminId, deliverymanId, recipientId, coordinates }: RecipientPropsType) {

    const hasDeliveryman = await this.deliverymanRepository.getByID(deliverymanId)
    if (!hasDeliveryman) throw new NotAllowed()

    const hasAdmin = await this.adminRepository.getByID(adminId)
    if (!hasAdmin) throw new NotAllowed()

    const hasRecipient = await this.recipientRepository.getById(recipientId)
    if (!hasRecipient) throw new NotAllowed()

    const coordinate = coordinates ? Coordinate.create(coordinates) : hasRecipient.coordinate

    const packageOrder = Package.create({
      coordinates: coordinate,
      deliveryManId: hasDeliveryman.id,
      recipientId: hasRecipient.id,
      status: Status.create({ changedAt: new Date, status: 'waiting-for-delivery' })
    })

    await this.packageRepository.create(packageOrder)
  }
} 