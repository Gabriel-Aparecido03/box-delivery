import { Injectable } from "@nestjs/common";
import { AdminRepository } from "../repositories/admin-repository";
import { NotAllowed } from "./errors/not-allowed";
import { PackageRepository } from "../repositories/packages-repository";

interface FetchPackagesUseCaseType { 
  adminId: string
}

@Injectable()
export class FetchPackagesUseCase {
  constructor(private packagesRepository: PackageRepository, private adminRepository: AdminRepository) { }

  async execute({ adminId }:FetchPackagesUseCaseType) {
    const admin = await this.adminRepository.getByID(adminId)
    if(!admin) throw new NotAllowed()

    const result = await this.packagesRepository.fetchAllPackages()
    return { packages : result }
  }
} 