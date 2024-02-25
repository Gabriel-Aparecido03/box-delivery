import { Recipient } from "src/domain/delivery/enterprise/entities/recipient";

export class RecipientPresenter {
  static toHTTP(recipient : Recipient) {
    return {
      id : recipient.id.toString(),
      coordinates : {
        latitude : recipient.coordinate.latitude,
        longitude : recipient.coordinate.longitude,
      },
      createdAt : recipient.createdAt,
      updatedAt : recipient.updatedAt,
      documentNumber : recipient.documentNumber.value,
      name : recipient.name
    }
  }
}