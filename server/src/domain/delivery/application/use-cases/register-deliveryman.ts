import { UniqueEntityID } from "src/domain/core/unique-entity-id";
import { Deliveryman } from "../../enterprise/entities/deliveryman";
import { Coordinate, CoordinateType } from "../../enterprise/entities/value-object/coordinate";
import { DocumentNumber } from "../../enterprise/entities/value-object/document-number";
import { AdminRepository } from "../repositories/admin-repository";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { InvalidDocumentNumberError } from "./errors/invalid-document-number";
import { RepeatedDocumentNumberError } from "./errors/repeated-document-number";
import { HashGenerator } from "../cryptography/hash-generator";
import { NotAllowed } from "./errors/not-allowed";
import { InvalidCoordinates } from "./errors/invalid-coordinates";
import { Injectable } from "@nestjs/common";

interface RegisterDeliverymanUseCasePropsType {
  documentNumber: string
  coordinates: CoordinateType
  name: string
  password: string
  adminId: string
}

@Injectable()
export class RegisterDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliverymanRepository,
    private adminRepository: AdminRepository,
    private hashGenerator: HashGenerator
  ) { }

  async execute({ adminId, coordinates, documentNumber, name, password }: RegisterDeliverymanUseCasePropsType) {
    const isRepeatedDocumentNumber = await this.deliverymanRepository.getByDocumentNumber(documentNumber)
    if (isRepeatedDocumentNumber) throw new RepeatedDocumentNumberError()

    const isValidDocumentNumber = DocumentNumber.validatedDocumentNumber(documentNumber)
    if (!isValidDocumentNumber) throw new InvalidDocumentNumberError()

    const coordinate = Coordinate.create(coordinates)
    if( !coordinate.validateCoordinates()) throw new InvalidCoordinates()

    const isAdmin = await this.adminRepository.getByID(adminId)
    if (!isAdmin) throw new NotAllowed()

    const deliveryman = Deliveryman.create({
      coordinate,
      documentNumber: DocumentNumber.create(documentNumber),
      name,
      password: await this.hashGenerator.encrypt(password)
    })

    await this.deliverymanRepository.create(deliveryman)
  }
} 