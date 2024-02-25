import { RecipientRepository } from "src/domain/delivery/application/repositories/recipient-repository"
import { Recipient } from "src/domain/delivery/enterprise/entities/recipient"

export class InMemoryRecipientRepository implements RecipientRepository {

  items: Recipient[] = []

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }

  async update(recipient: Recipient): Promise<void> {
    const index = this.items.findIndex(x => x.id === recipient.id)
    this.items[index] = recipient
  }

  async delete(id: string): Promise<void> {
    const filtered = this.items.filter(x => x.id.toString() !== id)
    this.items = filtered
  }

  async getByDocumentNumber(documentNumber: string): Promise<Recipient> {
    const result = this.items.find(x => x.documentNumber.value === documentNumber)
    return result
  }

  async getById(id: string): Promise<Recipient> {
    const result = this.items.find(x => x.id.toString() === id)
    return result
  }
}