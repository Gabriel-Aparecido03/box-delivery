import { Injectable } from "@nestjs/common";
import { PackageRepository } from "../repositories/packages-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

interface RecipientPropsType {
  packageId : string
}

@Injectable()
export class GetStatusOfPackageUseCase {
  constructor(private packageRepository : PackageRepository ) {}

  async execute({ packageId } : RecipientPropsType) {

    const packageOrder = await this.packageRepository.getByID(packageId)
    if(!packageOrder) throw new ResourceNotFound()
    const status = packageOrder.status.value.status
    return { status }
  }
} 