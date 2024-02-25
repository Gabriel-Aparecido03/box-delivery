import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "src/domain/core/unique-entity-id"
import { AttachmentProps, Attachment } from "src/domain/delivery/enterprise/entities/attachment"

export function makeAttachment(
  override: Partial<AttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const attachment = Attachment.create(
    {
      name: faker.lorem.slug(),
      url: faker.lorem.slug(),
      ...override,
    },
    id,
  )

  return attachment
}