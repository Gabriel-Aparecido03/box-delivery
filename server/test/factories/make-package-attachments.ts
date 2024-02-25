import { UniqueEntityID } from "src/domain/core/unique-entity-id";
import { PackageAttachment, PackageAttachmentType } from "src/domain/delivery/enterprise/entities/package-attachment";

export function makePackageAttachment(override: Partial<PackageAttachmentType> = {},
  id?: UniqueEntityID,) {
  const packageAttachment = PackageAttachment.create({
    attachmentId: new UniqueEntityID(),
    packageId: new UniqueEntityID(),
    ...override
  }, id)

  return packageAttachment
} 