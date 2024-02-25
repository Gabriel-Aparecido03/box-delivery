import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { DeleteDeliverymanUseCase } from "./delete-deliveryman"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { makeAdmin } from "test/factories/make-admin"
import { NotAllowed } from "./errors/not-allowed"
import { ResourceNotFound } from "./errors/resource-not-found"

describe('delete deliveryman use case', () => {
  let sut: DeleteDeliverymanUseCase
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
  let inMemoryAdminRepository : InMemoryAdminRepository

  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    sut = new DeleteDeliverymanUseCase(inMemoryDeliverymanRepository,inMemoryAdminRepository)
  })

  it('should be to delete of deliveryman account', async () => {
    const admin = makeAdmin({ password: 'password-hashed' })
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.create(deliveryman)

    const result = await sut.execute({ adminId : admin.id.toString(), deliverymanId : deliveryman.id.toString() })

    expect(result).toBeUndefined()
    expect(inMemoryDeliverymanRepository.items).toHaveLength(0)
  })

  it('not should be to delete of deliveryman account with non exists admin id', async () => {
    const admin = makeAdmin({ password: 'password-hashed' })
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.create(deliveryman)

    expect(async () => {
      await sut.execute({ adminId : 'wrong-id', deliverymanId : deliveryman.id.toString() })
    }).rejects.toBeInstanceOf(NotAllowed)
  })

  it('not should be to delete of deliveryman account with non exists deliveryman id', async () => {
    const admin = makeAdmin({ password: 'password-hashed' })
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.create(deliveryman)

    expect(async () => {
      await sut.execute({ adminId : admin.id.toString(), deliverymanId : 'wrong-id' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})