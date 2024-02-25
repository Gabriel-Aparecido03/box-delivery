import { makeAdmin } from "test/factories/make-admin"
import { makePackage } from "test/factories/make-package"
import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { InMemoryPackageRepository } from "test/in-memory-repository/in-memory-package-repository"
import { NotAllowed } from "./errors/not-allowed"
import { ResourceNotFound } from "./errors/resource-not-found"
import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { InMemoryRecipientRepository } from "test/in-memory-repository/in-memory-recipient-repository"
import { makeRecipient } from "test/factories/make-recipient"
import { UpdateRecipientUseCase } from "./update-recipient"

describe('register packages use case', () => {
  let sut: UpdateRecipientUseCase
  let inMemoryPackageRepository: InMemoryPackageRepository
  let inMemoryAdminRepository: InMemoryAdminRepository
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
  let inMemoryRecipientRepository: InMemoryRecipientRepository
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new UpdateRecipientUseCase(
      inMemoryRecipientRepository,
      inMemoryAdminRepository,

    )
  })

  it('should be to update of recipient', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const recipient = makeRecipient()
    inMemoryRecipientRepository.items.push(recipient)

    const packageOrder = makePackage({ deliveryManId: deliveryman.id })
    inMemoryPackageRepository.create(packageOrder)

    const result = await sut.execute({
      adminId: admin.id.toString(),
      coordinate: { latitude: -23.494656, longitude: -47.5136 },
      documentNumber: '37740682080',
      recipientId: recipient.id.toString()
    })

    expect(result).toBeUndefined()
    expect(inMemoryRecipientRepository.items[0].documentNumber.value).toEqual('37740682080')
  })

  it('not should be to update of recipient with non exists', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const recipient = makeRecipient()
    inMemoryRecipientRepository.items.push(recipient)

    const packageOrder = makePackage({ deliveryManId: deliveryman.id })
    inMemoryPackageRepository.create(packageOrder)

    expect(async () => {
      await sut.execute({
        adminId: admin.id.toString(),
        coordinate: { latitude: -23.494656, longitude: -47.5136 },
        documentNumber: '37740682080',
        recipientId: 'wrong-id'
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('not should be to update of recipient with non exists admin id', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const recipient = makeRecipient()
    inMemoryRecipientRepository.items.push(recipient)

    const packageOrder = makePackage({ deliveryManId: deliveryman.id })
    inMemoryPackageRepository.create(packageOrder)

    expect(async () => {
      await sut.execute({
        adminId: 'wrong-id',
        coordinate: { latitude: -23.494656, longitude: -47.5136 },
        documentNumber: '37740682080',
        recipientId: recipient.id.toString()
      })
    }).rejects.toBeInstanceOf(NotAllowed)
  })
})