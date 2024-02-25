import { Injectable } from "@nestjs/common";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { PackageRepository } from "../repositories/packages-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

interface FetchPackageOfDeliverymanUseCasePropsType {
  deliverymanId: string
}

@Injectable()
export class FetchPackageOfDeliverymanUseCase {

  constructor(private deliverymanRepository: DeliverymanRepository, private packageRepository: PackageRepository) { }

  async execute({ deliverymanId }: FetchPackageOfDeliverymanUseCasePropsType) {

    const deliveryman = await this.deliverymanRepository.getByID(deliverymanId)
    if (!deliveryman) throw new ResourceNotFound()

    const packages = await this.packageRepository.fetchAllPackagesOfDeliveryman(deliverymanId)
    return { packages }
  }
}