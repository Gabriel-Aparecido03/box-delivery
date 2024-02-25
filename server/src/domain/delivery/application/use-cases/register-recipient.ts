import { Injectable } from "@nestjs/common";
import { Recipient } from "../../enterprise/entities/recipient";
import { Coordinate, CoordinateType } from "../../enterprise/entities/value-object/coordinate";
import { DocumentNumber } from "../../enterprise/entities/value-object/document-number";
import { HashGenerator } from "../cryptography/hash-generator";
import { AdminRepository } from "../repositories/admin-repository";
import { RecipientRepository } from "../repositories/recipient-repository";
import { InvalidDocumentNumberError } from "./errors/invalid-document-number";
import { NotAllowed } from "./errors/not-allowed";
import { RepeatedDocumentNumberError } from "./errors/repeated-document-number";

interface RecipientPropsType {
  documentNumber: string
  coordinates: CoordinateType
  name: string
  adminId: string
}

@Injectable()
export class RegisterRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository, private adminRepository: AdminRepository ) { }

  async execute({ adminId, coordinates ,documentNumber ,name }: RecipientPropsType) {
    const isRepeatedDocumentNumber = await this.recipientRepository.getByDocumentNumber(documentNumber)
    if (isRepeatedDocumentNumber) throw new RepeatedDocumentNumberError()

    const isValidDocumentNumber = DocumentNumber.validatedDocumentNumber(documentNumber)
    if (!isValidDocumentNumber) throw new InvalidDocumentNumberError()

    const isAdmin = await this.adminRepository.getByID(adminId)
    if (!isAdmin) throw new NotAllowed()

    const recipient = Recipient.create({
      coordinate : Coordinate.create(coordinates),
      documentNumber : DocumentNumber.create(documentNumber),
      name,
    })

    await this.recipientRepository.create(recipient)
  }
} 