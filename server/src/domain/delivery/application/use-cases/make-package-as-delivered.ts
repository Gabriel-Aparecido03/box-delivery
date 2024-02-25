import { UniqueEntityID } from "src/domain/core/unique-entity-id"
import { PackageAttachment } from "../../enterprise/entities/package-attachment"
import { Status } from "../../enterprise/entities/value-object/status"
import { DeliverymanRepository } from "../repositories/deliveryman-repository"
import { PackageRepository } from "../repositories/packages-repository"
import { PhotoIsRequired } from "./errors/photo-is-required"
import { ResourceNotFound } from "./errors/resource-not-found"
import { PackageAttachmentsList } from "../../enterprise/entities/package-attachments-list"
import { NotAllowed } from "./errors/not-allowed"
import { Injectable } from "@nestjs/common"
import { Package } from "../../enterprise/entities/package"

interface MakePackageAsDeliveredUseCaseTypeProps {
  packageId: string
  deliverymanId: string
}

@Injectable()
export class MakePackageAsDeliveredUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository, private packageRepository: PackageRepository) { }

  async execute({ deliverymanId, packageId }: MakePackageAsDeliveredUseCaseTypeProps) {
    const packageOrder = await this.packageRepository.getByID(packageId)
    if (!packageOrder) throw new ResourceNotFound()

    const deliveryman = await this.deliverymanRepository.getByID(deliverymanId)
    if (!deliveryman) throw new ResourceNotFound()

    if (deliveryman.id.toString() !== packageOrder.deliveryManId.toString()) throw new NotAllowed()

    packageOrder.status = Status.create({ changedAt: new Date(), status: 'delivered' })
    await this.packageRepository.changeStatusToDelivered(Package.create({
      coordinates : packageOrder.coordinates,
      deliveryManId : packageOrder.deliveryManId,
      recipientId : packageOrder.recipientId,
      status : packageOrder.status,
      createdAt : packageOrder.createdAt,
      updatedAt : packageOrder.updatedAt
    }, packageOrder.id))
  }
}