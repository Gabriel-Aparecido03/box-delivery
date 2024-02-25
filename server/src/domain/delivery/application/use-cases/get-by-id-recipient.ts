import { Injectable } from "@nestjs/common";
import { RecipientRepository } from "../repositories/recipient-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

interface GetByIdRecipientUseCaseType {
  recipientId: string
}

@Injectable()
export class GetByIdRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) { }

  async execute({ recipientId }:GetByIdRecipientUseCaseType) {
    const recipient = await this.recipientRepository.getById(recipientId)
    if (!recipient) throw new ResourceNotFound()

    return { recipient }
  }
} 