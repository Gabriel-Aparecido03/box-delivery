import { Injectable } from "@nestjs/common";
import { AdminRepository } from "../repositories/admin-repository";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { NotAllowed } from "./errors/not-allowed";
import { ResourceNotFound } from "./errors/resource-not-found";

interface DeleteDeliverymanUseCasePropsType {
  deliverymanId : string
  adminId : string
}

@Injectable()
export class DeleteDeliverymanUseCase {
  constructor(private deliverymanRepository : DeliverymanRepository, private adminRepository : AdminRepository ) {}

  async execute({ adminId ,deliverymanId} : DeleteDeliverymanUseCasePropsType) {
    const isAdmin = await this.adminRepository.getByID(adminId)
    if(!isAdmin) throw new NotAllowed()

    const hasDeliveryman = await this.deliverymanRepository.getByID(deliverymanId)
    if(!hasDeliveryman) throw new ResourceNotFound()

    await this.deliverymanRepository.delete(deliverymanId)
  }
} 