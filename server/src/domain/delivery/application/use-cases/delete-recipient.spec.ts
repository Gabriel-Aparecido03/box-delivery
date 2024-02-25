import { makeAdmin } from "test/factories/make-admin"
import { makeRecipient } from "test/factories/make-recipient"
import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { InMemoryRecipientRepository } from "test/in-memory-repository/in-memory-recipient-repository"
import { NotAllowed } from "./errors/not-allowed"
import { ResourceNotFound } from "./errors/resource-not-found"
import { DeleteRecipientUseCase } from "./delete-recipient"
import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"

describe('delete recipients use case', () => {
  let sut: DeleteRecipientUseCase
  let inMemoryRecipientRepository: InMemoryRecipientRepository
  let inMemoryAdminRepository: InMemoryAdminRepository
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository

  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    sut = new DeleteRecipientUseCase(inMemoryRecipientRepository, inMemoryAdminRepository)
  })

  it('should be to delete of recipient', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const recipient = makeRecipient()
    inMemoryRecipientRepository.create(recipient)

    const result = await sut.execute({ adminId: admin.id.toString(), recipientId: recipient.id.toString() })

    expect(result).toBeUndefined()
    expect(inMemoryRecipientRepository.items).toHaveLength(0)
  })

  it('not should be to delete of recipient with non exists adminId', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const recipient = makeRecipient()
    inMemoryRecipientRepository.create(recipient)

    expect(async () => {
      await sut.execute({ adminId: 'wrong-admin-id', recipientId: recipient.id.toString() })
    }).rejects.toBeInstanceOf(NotAllowed)
  })

  it('not should be to delete of recipient account with non exists recipient id', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const recipient = makeRecipient()
    inMemoryRecipientRepository.create(recipient)

    expect(async () => {
      await sut.execute({ adminId: admin.id.toString(), recipientId: 'wrong-id' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})