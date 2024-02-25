import { Injectable } from "@nestjs/common";
import { AdminRepository } from "../repositories/admin-repository";
import { PackageRepository } from "../repositories/packages-repository";
import { NotAllowed } from "./errors/not-allowed";
import { ResourceNotFound } from "./errors/resource-not-found";

interface PackagetPropsType {
  packageId : string
  adminId : string
}

@Injectable()
export class DeletePackageUseCase {
  constructor(private packageRepository : PackageRepository, private adminRepository : AdminRepository ) {}

  async execute({ adminId ,packageId } : PackagetPropsType) {
    const isAdmin = await this.adminRepository.getByID(adminId)
    if(!isAdmin) throw new NotAllowed()

    const hasPackage = await this.packageRepository.getByID(packageId)
    if(!hasPackage) throw new ResourceNotFound()

    await this.packageRepository.delete(packageId)
  }
} 