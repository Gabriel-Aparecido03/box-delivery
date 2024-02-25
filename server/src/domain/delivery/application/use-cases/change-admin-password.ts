import { Injectable } from "@nestjs/common";
import { HashGenerator } from "../cryptography/hash-generator";
import { AdminRepository } from "../repositories/admin-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

interface ChangeAdminPasswordUseCasePropsType {
  adminId : string
  password : string
}

@Injectable()
export class ChangeAdminPasswordUseCase {
  constructor(private adminRepository : AdminRepository , private hashGenerator : HashGenerator) {}

  async execute({ adminId  , password } : ChangeAdminPasswordUseCasePropsType) {
    const admin = await this.adminRepository.getByID(adminId)
    if(!admin) throw new ResourceNotFound()

    const hashPassword = await this.hashGenerator.encrypt(password)

    admin.password = hashPassword
    
    await this.adminRepository.update(admin)
  }
} 