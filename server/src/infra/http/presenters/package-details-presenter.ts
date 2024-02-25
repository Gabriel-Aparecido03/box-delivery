import { Package } from "src/domain/delivery/enterprise/entities/package";
import { PackageWithDetails } from "src/domain/delivery/enterprise/entities/value-object/package-wtih-details";

export class PackageWithDetailsPresenter {
  static toHTTP(packageOrder : PackageWithDetails) {
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
        name : packageOrder.recipientName.toString(),
        id : packageOrder.recipientId.toString(),
      },
      deliveryman : {
        name : packageOrder.deliverymanName.toString(),
        id : packageOrder.recipientId.toString(),
      }
    }
  }
}