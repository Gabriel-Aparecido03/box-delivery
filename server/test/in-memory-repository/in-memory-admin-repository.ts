import { AdminRepository } from "src/domain/delivery/application/repositories/admin-repository";
import { Admin } from "src/domain/delivery/enterprise/entities/admin";

export class InMemoryAdminRepository implements AdminRepository {

  items : Admin[] = []

  async create(admin: Admin): Promise<void> {
    this.items.push(admin)
  }

  async update(admin: Admin): Promise<void> {
    const index = this.items.findIndex( x => x.id === admin.id)
    this.items[index] = admin
  }

  async delete(id: string): Promise<void> {
    this.items.filter( x => x.id.toString() !== id)
  }

  async getByDocumentNumber(documentNumber: string): Promise<Admin> {
    const result =  this.items.find(x => x.documentNumber.value === documentNumber)
    return result
  }

  async getByID(id: string): Promise<Admin> {
    const result =  this.items.find(x => x.id.toString() === id)
    return result
  }
}