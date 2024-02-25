import { Package } from "src/domain/delivery/enterprise/entities/package";

export class PackagePresenter {
  static toHTTP(packageOrder : Package) {
    return {
      id : packageOrder.id.toString(),
      coordinates : {
        latitude : packageOrder.coordinates.latitude,
        longitude : packageOrder.coordinates.longitude,
      },
      createdAt : packageOrder.createdAt,
      updatedAt : packageOrder.updatedAt,
      status : {
        name : packageOrder.status.value.status,
        updatedAt : packageOrder.status.value.changedAt
      },
      recipient : {
        name : packageOrder.recipientId.toString(),
        id : packageOrder.recipientId.toString(),
      },
      deliveryman : {
        name : packageOrder.recipientId.toString(),
        id : packageOrder.recipientId.toString(),
      }
    }
  }
}