import { makeAdmin } from "test/factories/make-admin"
import { makePackage } from "test/factories/make-package"
import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { InMemoryPackageRepository } from "test/in-memory-repository/in-memory-package-repository"
import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { InMemoryRecipientRepository } from "test/in-memory-repository/in-memory-recipient-repository"
import { makeRecipient } from "test/factories/make-recipient"
import { UpdatePackageUseCase } from "./update-package"
import { ResourceNotFound } from "./errors/resource-not-found"
import { NotAllowed } from "./errors/not-allowed"

describe('update packages use case', () => {
  let sut: UpdatePackageUseCase
  let inMemoryPackageRepository: InMemoryPackageRepository
  let inMemoryAdminRepository: InMemoryAdminRepository
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
  let inMemoryRecipientRepository: InMemoryRecipientRepository
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new UpdatePackageUseCase(
      inMemoryAdminRepository,
      inMemoryPackageRepository,
    )
  })

  it('should be to update of package', async () => {
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
      coordinates: { latitude: -23.494656, longitude: -47.5136 },
      packageId: packageOrder.id.toString(),
    })

    expect(result).toBeUndefined()
    expect(inMemoryPackageRepository.items[0].coordinates.latitude).toEqual(-23.494656)
    expect(inMemoryPackageRepository.items[0].coordinates.longitude).toEqual(-47.5136)
  })

  it('not should be to update of package with non exists id', async () => {
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
        coordinates: { latitude: -23.494656, longitude: -47.5136 },
        packageId: 'wrong-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('not should be to update of package with non exists id', async () => {
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
        coordinates: { latitude: -23.494656, longitude: -47.5136 },
        packageId: packageOrder.id.toString()
      })
    }).rejects.toBeInstanceOf(NotAllowed)
  })
})