import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "src/domain/core/unique-entity-id"
import { Package, PackagePropsType } from "src/domain/delivery/enterprise/entities/package"
import { PackageAttachmentsList } from "src/domain/delivery/enterprise/entities/package-attachments-list"
import { Coordinate } from "src/domain/delivery/enterprise/entities/value-object/coordinate"
import { Status } from "src/domain/delivery/enterprise/entities/value-object/status"

export function makePackage(
  override: Partial<PackagePropsType> = {},
  id?: UniqueEntityID,
) {
  const packageOrder = Package.create(
    {
      coordinates : Coordinate.create({ latitude : faker.location.latitude() , longitude : faker.location.longitude()}),
      attachments : new PackageAttachmentsList([]),
      deliveryManId : new UniqueEntityID(),
      recipientId : new UniqueEntityID(),
      status : Status.create({ changedAt : new Date(), status : 'waiting-for-delivery'}),
      ...override,
    },
    id,
  ) 

  return packageOrder
}