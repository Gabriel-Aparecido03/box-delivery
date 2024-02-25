import { Admin } from "../../enterprise/entities/admin";
import { Coordinate, CoordinateType } from "../../enterprise/entities/value-object/coordinate";
import { DocumentNumber } from "../../enterprise/entities/value-object/document-number";
import { AdminRepository } from "../repositories/admin-repository";
import { InvalidDocumentNumberError } from "./errors/invalid-document-number";
import { RepeatedDocumentNumberError } from "./errors/repeated-document-number";
import { HashGenerator } from "../cryptography/hash-generator";
import { NotAllowed } from "./errors/not-allowed";
import { InvalidCoordinates } from "./errors/invalid-coordinates";
import { Injectable } from "@nestjs/common";

interface RegisterAdminUseCasePropsType {
  documentNumber: string
  coordinates: CoordinateType
  name: string
  password: string
  adminId: string
}

@Injectable()
export class RegisterAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private hashGenerator: HashGenerator
  ) { }

  async execute({ adminId, coordinates, documentNumber, name, password }: RegisterAdminUseCasePropsType) {

    const isRepeatedDocumentNumber = await this.adminRepository.getByDocumentNumber(documentNumber)
    if (isRepeatedDocumentNumber) throw new RepeatedDocumentNumberError()

    const isValidDocumentNumber = DocumentNumber.validatedDocumentNumber(documentNumber)
    if (!isValidDocumentNumber) throw new InvalidDocumentNumberError()
  
    const coordinate = Coordinate.create(coordinates)
    if( !coordinate.validateCoordinates()) throw new InvalidCoordinates() 

    const isAdmin = await this.adminRepository.getByID(adminId)
    if (!isAdmin) throw new NotAllowed()
    
    const admin = Admin.create({
      coordinate,
      documentNumber: DocumentNumber.create(documentNumber),
      name,
      password: await this.hashGenerator.encrypt(password)
    })

    await this.adminRepository.create(admin)
  }
} 