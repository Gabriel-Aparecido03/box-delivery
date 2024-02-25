import { UniqueEntityID } from "src/domain/core/unique-entity-id";
import { Entity } from "../../../core/entity";

export interface AttachmentProps {
  url : string
  name : string
}

export class Attachment extends Entity<AttachmentProps> {
  get url() {
    return this.props.url
  }

  get name() {
    return this.props.name
  }

  static create(props: AttachmentProps , id?: UniqueEntityID ) {
    const attachment = new Attachment(props,id)
    return attachment
  }
}