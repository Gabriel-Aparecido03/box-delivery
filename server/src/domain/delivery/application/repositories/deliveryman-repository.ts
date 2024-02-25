import { Injectable } from "@nestjs/common";
import { Deliveryman } from "../../enterprise/entities/deliveryman";

@Injectable()
export abstract class DeliverymanRepository {
  abstract create(deliveryMan : Deliveryman) : Promise<void>
  abstract update(deliveryman : Deliveryman) : Promise<void>
  abstract delete(id : string) : Promise<void>
  abstract getByID(id : string) : Promise<Deliveryman>
  abstract getByDocumentNumber(documentNumber : string) : Promise<Deliveryman>
  abstract fetchAllDeliverymans() : Promise<Deliveryman[]>
}