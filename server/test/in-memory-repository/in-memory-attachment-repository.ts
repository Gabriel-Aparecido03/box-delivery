import { AttachmentsRepository } from "src/domain/delivery/application/repositories/attachment-repository"
import { Attachment } from "src/domain/delivery/enterprise/entities/attachment"

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}