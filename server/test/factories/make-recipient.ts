import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "src/domain/core/unique-entity-id"
import { Recipient, RecipientPropsType } from "src/domain/delivery/enterprise/entities/recipient"
import { Coordinate } from "src/domain/delivery/enterprise/entities/value-object/coordinate"
import { DocumentNumber } from "src/domain/delivery/enterprise/entities/value-object/document-number"

export function makeRecipient(
  override: Partial<RecipientPropsType> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      coordinate : Coordinate.create({ latitude : faker.location.latitude() , longitude : faker.location.longitude()}),
      name : faker.lorem.text(),
      documentNumber : DocumentNumber.create('123-456-789-00'),
      ...override,
    },
    id,
  ) 

  return recipient
}