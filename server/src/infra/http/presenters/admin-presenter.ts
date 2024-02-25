import { Admin } from "src/domain/delivery/enterprise/entities/admin";

export class AdminPresenter {
  static toHTTP(admin : Admin) {
    return {
      id : admin.id.toString(),
      coordinates : {
        latitude : admin.coordinate.latitude,
        longitude : admin.coordinate.longitude,
      },
      createdAt : admin.createdAt,
      updatedAt : admin.updatedAt,
      documentNumber : admin.documentNumber.value,
      name : admin.name
    }
  }
}