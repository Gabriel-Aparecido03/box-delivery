import { makePackage } from "test/factories/make-package"
import { InMemoryPackageRepository } from "test/in-memory-repository/in-memory-package-repository"
import { FetchPackageOfRecipientUseCase } from "./fetch-my-packages-recipient"
import { InMemoryRecipientRepository } from "test/in-memory-repository/in-memory-recipient-repository"
import { makeRecipient } from "test/factories/make-recipient"

describe('fetch my packages recipient use case', () => {
  let sut: FetchPackageOfRecipientUseCase
  let inMemoryPackageRepository: InMemoryPackageRepository
  let inMemoryRecipientRepository: InMemoryRecipientRepository
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new FetchPackageOfRecipientUseCase(inMemoryRecipientRepository, inMemoryPackageRepository)
  })

  it('should be to fetch packages of recipient ', async () => {

    const recipient = makeRecipient()
    inMemoryRecipientRepository.items.push(recipient)

    for (let index = 0; index < 5 ; index++ ) {
      const packageOrder = makePackage({ recipientId: recipient.id })
      inMemoryPackageRepository.create(packageOrder)
    }
    const { packages } = await sut.execute({ recipientId: recipient.id.toString()})

    expect(packages).toHaveLength(5)
  })
})