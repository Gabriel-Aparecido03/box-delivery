import { Injectable } from "@nestjs/common";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

interface GetByIdDeliverymanUseCaseType { 
  deliverymanId: string
}

@Injectable()
export class GetByIdDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) { }

  async execute({ deliverymanId }:GetByIdDeliverymanUseCaseType) {
    const deliveryman = await this.deliverymanRepository.getByID(deliverymanId)
    if (!deliveryman) throw new ResourceNotFound()

    return { deliveryman }
  }
} 