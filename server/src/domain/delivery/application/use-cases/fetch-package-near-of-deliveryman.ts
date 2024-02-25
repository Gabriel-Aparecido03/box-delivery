import { Injectable } from "@nestjs/common";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { PackageRepository } from "../repositories/packages-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

interface FetchPackageNearOfDeliverymanUseCasePropsType {
  deliverymanId: string
}

@Injectable()
export class FetchPackageNearOfDeliverymanUseCase {

  constructor(private deliverymanRepository: DeliverymanRepository, private packageRepository: PackageRepository) { }

  async execute({ deliverymanId }: FetchPackageNearOfDeliverymanUseCasePropsType) {

    const deliveryman = await this.deliverymanRepository.getByID(deliverymanId)
    if (!deliveryman) throw new ResourceNotFound()

    const packages = await this.packageRepository.fetchPackagesNear({ coordinates : deliveryman.coordinate, deliverymanId })
    return { packages }
  }
}