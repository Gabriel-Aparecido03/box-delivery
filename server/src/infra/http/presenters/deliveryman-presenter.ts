import { Deliveryman } from "src/domain/delivery/enterprise/entities/deliveryman";

export class DeliverymanPresenter {
  static toHTTP(deliveryman : Deliveryman) {
    return {
      id : deliveryman.id.toString(),
      coordinates : {
        latitude : deliveryman.coordinate.latitude,
        longitude : deliveryman.coordinate.longitude,
      },
      createdAt : deliveryman.createdAt,
      updatedAt : deliveryman.updatedAt,
      documentNumber : deliveryman.documentNumber.value,
      name : deliveryman.name
    }
  }
}