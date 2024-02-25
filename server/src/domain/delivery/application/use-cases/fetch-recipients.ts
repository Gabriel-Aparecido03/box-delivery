import { Injectable } from "@nestjs/common";
import { AdminRepository } from "../repositories/admin-repository";
import { NotAllowed } from "./errors/not-allowed";
import { RecipientRepository } from "../repositories/recipient-repository";

interface FetchRecipientsUseCaseType { 
  adminId: string
}

@Injectable()
export class FetchRecipientsUseCase {
  constructor(private recipientsRepository: RecipientRepository, private adminRepository: AdminRepository) { }

  async execute({ adminId }:FetchRecipientsUseCaseType) {
    const admin = await this.adminRepository.getByID(adminId)
    if(!admin) throw new NotAllowed()

    const result = await this.recipientsRepository.fetchAllRecipients()
    return { recipients : result }
  }
} 