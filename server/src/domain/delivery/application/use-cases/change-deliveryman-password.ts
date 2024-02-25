import { Injectable } from "@nestjs/common";
import { HashGenerator } from "../cryptography/hash-generator";
import { AdminRepository } from "../repositories/admin-repository";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

interface UpdateDeliverymanUseCasePropsType {
  adminId: string
  deliverymanId: string
  password: string
}

@Injectable()
export class ChangeDeleverymanPasswordUseCase {
  constructor(
    private deliverymanRepository: DeliverymanRepository,
    private adminRepository: AdminRepository,
    private hashGenerator: HashGenerator
  ) { }

  async execute({ adminId, deliverymanId, password }: UpdateDeliverymanUseCasePropsType) {
    const deliveryman = await this.deliverymanRepository.getByID(deliverymanId)
    if (!deliveryman) throw new ResourceNotFound()

    const isAdmin = await this.adminRepository.getByID(adminId)
    if (!isAdmin) throw new ResourceNotFound()

    const hashPassword = await this.hashGenerator.encrypt(password)

    deliveryman.password = hashPassword

    await this.deliverymanRepository.update(deliveryman)
  }
} 