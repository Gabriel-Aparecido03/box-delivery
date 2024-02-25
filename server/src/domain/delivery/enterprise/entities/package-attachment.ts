import { Entity } from "src/domain/core/entity"
import { UniqueEntityID } from "src/domain/core/unique-entity-id"

export interface PackageAttachmentType {
  packageId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class PackageAttachment extends Entity<PackageAttachmentType> {
  get packageId() {
    return this.props.packageId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: PackageAttachmentType, id?: UniqueEntityID) {
    const packageAttachments = new PackageAttachment(props, id)

    return packageAttachments
  }
}