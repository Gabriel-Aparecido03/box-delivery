import { makeAdmin } from "test/factories/make-admin"
import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { InMemoryPackageRepository } from "test/in-memory-repository/in-memory-package-repository"
import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { RegisterPackageUseCase } from "./register-package"
import { InMemoryRecipientRepository } from "test/in-memory-repository/in-memory-recipient-repository"
import { makeRecipient } from "test/factories/make-recipient"

describe('register packages use case', () => {
  let sut: RegisterPackageUseCase
  let inMemoryPackageRepository: InMemoryPackageRepository
  let inMemoryAdminRepository: InMemoryAdminRepository
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
  let inMemoryRecipientRepository: InMemoryRecipientRepository
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new RegisterPackageUseCase(
      inMemoryRecipientRepository,
      inMemoryAdminRepository,
      inMemoryPackageRepository,
      inMemoryDeliverymanRepository
    )
  })

  it('should be to delete of package', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const recipient = makeRecipient()
    inMemoryRecipientRepository.items.push(recipient)

    const result = await sut.execute({ 
      adminId : admin.id.toString(),
      deliverymanId : deliveryman.id.toString(),
      recipientId : recipient.id.toString()
    })

    expect(result).toBeUndefined()
    expect(inMemoryPackageRepository.items).toHaveLength(1)
  })
})