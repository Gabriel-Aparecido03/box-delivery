import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "src/domain/core/unique-entity-id"
import { Admin, AdminPropsType } from "src/domain/delivery/enterprise/entities/admin"
import { Coordinate } from "src/domain/delivery/enterprise/entities/value-object/coordinate"
import { DocumentNumber } from "src/domain/delivery/enterprise/entities/value-object/document-number"

export function makeAdmin(
  override: Partial<AdminPropsType> = {},
  id?: UniqueEntityID,
) {
  const admin = Admin.create(
    {
      coordinate : Coordinate.create({ latitude : faker.location.latitude() , longitude : faker.location.longitude()}),
      name : faker.lorem.text(),
      password : faker.internet.password(),
      documentNumber : DocumentNumber.create('123-456-789-00'),
      ...override,
    },
    id,
  ) 

  return admin
}