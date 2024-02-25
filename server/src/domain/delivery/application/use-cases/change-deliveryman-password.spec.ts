import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { makeAdmin } from "test/factories/make-admin"
import { InTextHashGenerator } from "test/cryptoghphay/in-test-hash-generator"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { ResourceNotFound } from "./errors/resource-not-found"
import { ChangeDeleverymanPasswordUseCase } from "./change-deliveryman-password"

describe('Change admin passoword use case', () => {
  let sut: ChangeDeleverymanPasswordUseCase
  let hasherGenerator: InTextHashGenerator
  let inMemoryAdminRepository: InMemoryAdminRepository
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository

  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    hasherGenerator = new InTextHashGenerator()
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    sut = new ChangeDeleverymanPasswordUseCase(inMemoryDeliverymanRepository, inMemoryAdminRepository, hasherGenerator)
  })

  it('should be to change deliveryman account', async () => {
    const admin = makeAdmin({ password: 'password-hashed' })
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.create(deliveryman)

    const result = await sut.execute({
      adminId: admin.id.toString(),
      deliverymanId: deliveryman.id.toString(),
      password: 'new-password'
    })

    expect(result).toBeUndefined()
    expect(inMemoryDeliverymanRepository.items[0].password).toEqual('new-password-hashed')
  })

  it('not should be to change deliveryman account with non exists admin', async () => {
    const admin = makeAdmin({ password: 'password-hashed' })
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.create(deliveryman)


    expect(async () => {
      await sut.execute({
        adminId: 'wrong-id',
        deliverymanId: deliveryman.id.toString(),
        password: 'new-password'
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('not should be to change deliveryman account with non exists deliveryman', async () => {
    const admin = makeAdmin({ password: 'password-hashed' })
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.create(deliveryman)

    expect(async () => {
      await sut.execute({
        adminId: admin.id.toString(),
        deliverymanId: 'wrong-id',
        password: 'new-password'
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})