import { RecipientRepository } from "../repositories/recipient-repository";
import { PackageRepository } from "../repositories/packages-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { Injectable } from "@nestjs/common";

interface FetchPackageOfRecipientUseCasePropsType {
  recipientId: string
}

@Injectable()
export class FetchPackageOfRecipientUseCase {

  constructor(private recipientRepository: RecipientRepository, private packageRepository: PackageRepository) { }

  async execute({ recipientId }: FetchPackageOfRecipientUseCasePropsType) {

    const recipient = await this.recipientRepository.getById(recipientId)
    if (!recipient) throw new ResourceNotFound()

    const packages = await this.packageRepository.fetchAllPackagesOfRecipient(recipientId)
    return { packages }
  }
}