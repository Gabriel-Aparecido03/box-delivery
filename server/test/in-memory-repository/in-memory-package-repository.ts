import { DomainEvents } from "src/domain/core/events/domain-events";
import { PackageRepository, fetchPackagesNear } from "src/domain/delivery/application/repositories/packages-repository";
import { Package } from "src/domain/delivery/enterprise/entities/package";
import { Status } from "src/domain/delivery/enterprise/entities/value-object/status";

export class InMemoryPackageRepository implements PackageRepository {


  items : Package[] = []
  
  async create(packageOrder: Package): Promise<void> {
    this.items.push(packageOrder)
  }

  async getByID(id: string): Promise<Package> {
    const result = this.items.find( i => i.id.toString() === id)
    return result
  }

  async update(packageOrder: Package): Promise<void> {
    const index = this.items.findIndex( i => i.id.toString() === packageOrder.id.toString())
    this.items[index] = packageOrder
  }

  async delete(id: string): Promise<void> {
    const filtered = this.items.filter( i => i.id.toString() !== id)
    this.items = filtered
  }

  async changeStatusToDelivered(packageOrder: Package): Promise<void> {
    const index = this.items.findIndex( i => i.id.toString() === packageOrder.id.toString())
    this.items[index].status =  Status.create({ changedAt : new Date() , status : 'delivered'})
    DomainEvents.dispatchEventsForAggregate(packageOrder.id)
  }

  async changeStatusToPickUp(packageOrder: Package): Promise<void> {
    const index = this.items.findIndex( i => i.id.toString() === packageOrder.id.toString())
    this.items[index].status =  Status.create({ changedAt : new Date() , status : 'pick-up'})
    DomainEvents.dispatchEventsForAggregate(packageOrder.id)
  }

  async changeStatusReturned(packageOrder: Package): Promise<void> {
    const index = this.items.findIndex( i => i.id.toString() === packageOrder.id.toString())
    this.items[index].status =  Status.create({ changedAt : new Date() , status : 'returned'})
    DomainEvents.dispatchEventsForAggregate(packageOrder.id)
  }
  
  async fetchPackagesNear({ coordinates , deliverymanId  }: fetchPackagesNear): Promise<Package[]> {
    const result = this.items.filter( x => x.coordinates.getDistanceBetweenCoordinates(x.coordinates , coordinates ) < 1000 && x.deliveryManId.toString() === deliverymanId)
    return result
  }
  
  async fetchAllPackagesOfDeliveryman(deliverymanId: string): Promise<Package[]> {
    const result = this.items.filter( i => i.deliveryManId.toString() === deliverymanId)
    return result
  }

  async fetchAllPackagesOfRecipient(recipientId: string): Promise<Package[]> {
    const result = this.items.filter( i => i.recipientId.toString() === recipientId)
    return result
  }
}