import { Injectable } from "@nestjs/common";
import { Coordinate, CoordinateType } from "../../enterprise/entities/value-object/coordinate";
import { DocumentNumber } from "../../enterprise/entities/value-object/document-number";
import { AdminRepository } from "../repositories/admin-repository";
import { RecipientRepository } from "../repositories/recipient-repository";
import { InvalidDocumentNumberError } from "./errors/invalid-document-number";
import { NotAllowed } from "./errors/not-allowed";
import { ResourceNotFound } from "./errors/resource-not-found";

interface UpdateRecipientUseCasePropsType {
  adminId: string
  recipientId: string
  documentNumber: string
  coordinate: CoordinateType
  name : string
}

@Injectable()
export class UpdateRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository, private adminRepository: AdminRepository) { }

  async execute({ coordinate, adminId, recipientId, documentNumber, name }: UpdateRecipientUseCasePropsType) {

    const recipient = await this.recipientRepository.getById(recipientId)
    if (!recipient) throw new ResourceNotFound()

    const isAdmin = await this.adminRepository.getByID(adminId)
    if (!isAdmin) throw new NotAllowed()

    if(!DocumentNumber.validatedDocumentNumber(documentNumber)) throw new InvalidDocumentNumberError()

    recipient.coordinate = Coordinate.create(coordinate)
    recipient.documentNumber = DocumentNumber.create(documentNumber)
    recipient.name = name

    await this.recipientRepository.update(recipient)
  }
} 