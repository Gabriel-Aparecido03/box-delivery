import { Injectable } from "@nestjs/common";
import { AdminRepository } from "../repositories/admin-repository";
import { RecipientRepository } from "../repositories/recipient-repository";
import { NotAllowed } from "./errors/not-allowed";
import { ResourceNotFound } from "./errors/resource-not-found";

interface RecipientPropsType {
  recipientId : string
  adminId : string
}

@Injectable()
export class DeleteRecipientUseCase {
  constructor(private recipientRepository : RecipientRepository, private adminRepository : AdminRepository ) {}

  async execute({ adminId ,recipientId } : RecipientPropsType) {

    const isAdmin = await this.adminRepository.getByID(adminId)
    if(!isAdmin) throw new NotAllowed()

    const hasRecipient = await this.recipientRepository.getById(recipientId)
    if(!hasRecipient) throw new ResourceNotFound()

    await this.recipientRepository.delete(recipientId)
  }
} 