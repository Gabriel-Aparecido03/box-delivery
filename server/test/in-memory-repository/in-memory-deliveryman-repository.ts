import { filter } from "rxjs"
import { DeliverymanRepository } from "src/domain/delivery/application/repositories/deliveryman-repository"
import { Deliveryman } from "src/domain/delivery/enterprise/entities/deliveryman"


export class InMemoryDeliverymanRepository implements DeliverymanRepository {

  items: Deliveryman[] = []

  async create(deliveryman: Deliveryman): Promise<void> {
    this.items.push(deliveryman)
  }

  async update(deliveryman: Deliveryman): Promise<void> {
    const index = this.items.findIndex(x => x.id === deliveryman.id)
    this.items[index] = deliveryman
  }

  async delete(id: string): Promise<void> {
    const filtered = this.items.filter(x => x.id.toString() !== id)
    this.items = filtered
  }

  async getByDocumentNumber(documentNumber: string): Promise<Deliveryman> {
    const result = this.items.find(x => x.documentNumber.value === documentNumber)
    return result
  }

  async getByID(id: string): Promise<Deliveryman> {
    const result = this.items.find(x => x.id.toString() === id)
    return result
  }
}