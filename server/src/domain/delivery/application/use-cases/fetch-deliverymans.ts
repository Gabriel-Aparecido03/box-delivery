import { Injectable } from "@nestjs/common";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { AdminRepository } from "../repositories/admin-repository";
import { NotAllowed } from "./errors/not-allowed";

interface FetchDeliverymansUseCaseType { 
  adminId: string
}

@Injectable()
export class FetchDeliverymansUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository, private adminRepository: AdminRepository) { }

  async execute({ adminId }:FetchDeliverymansUseCaseType) {
    const admin = await this.adminRepository.getByID(adminId)
    if(!admin) throw new NotAllowed()

    const result = await this.deliverymanRepository.fetchAllDeliverymans()
    return { deliverymans : result }
  }
} 