import { Injectable } from "@nestjs/common";
import { AdminRepository } from "../repositories/admin-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

interface GetByIdAdminUseCaseType { 
  adminId: string
}

@Injectable()
export class GetByIdAdminUseCase {
  constructor(private adminRepository: AdminRepository) { }

  async execute({ adminId }:GetByIdAdminUseCaseType) {
    const admin = await this.adminRepository.getByID(adminId)
    if (!admin) throw new ResourceNotFound()

    return { admin }
  }
} 