import { Injectable } from "@nestjs/common";
import { Coordinate, CoordinateType } from "../../enterprise/entities/value-object/coordinate";
import { DocumentNumber } from "../../enterprise/entities/value-object/document-number";
import { AdminRepository } from "../repositories/admin-repository";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { InvalidDocumentNumberError } from "./errors/invalid-document-number";
import { NotAllowed } from "./errors/not-allowed";
import { ResourceNotFound } from "./errors/resource-not-found";

interface UpdateDeliverymanUseCasePropsType {
  adminId : string
  deliverymanId : string
  documentNumber : string
  coordinate : CoordinateType
  name : string
}

@Injectable()
export class UpdateDeliverymanUseCase {
  constructor(private deliverymanRepository : DeliverymanRepository, private adminRepository : AdminRepository ) {}

  async execute({ coordinate , adminId ,deliverymanId ,documentNumber , name} : UpdateDeliverymanUseCasePropsType) {
    const deliveryman = await this.deliverymanRepository.getByID(deliverymanId)
    if(!deliveryman) throw new ResourceNotFound()

    const isAdmin = await this.adminRepository.getByID(adminId)
    if(!isAdmin) throw new NotAllowed()

    if(!DocumentNumber.validatedDocumentNumber(documentNumber)) throw new InvalidDocumentNumberError()

    deliveryman.coordinate = Coordinate.create(coordinate)
    deliveryman.documentNumber = DocumentNumber.create(documentNumber)
    deliveryman.name = name
    await this.deliverymanRepository.update(deliveryman)
  }
} 