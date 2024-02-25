import { makeRecipient } from "test/factories/make-recipient"
import { InMemoryRecipientRepository } from "test/in-memory-repository/in-memory-recipient-repository"
import { ResourceNotFound } from "./errors/resource-not-found"
import { GetByIdRecipientUseCase } from "./get-by-id-recipient"

describe('get recipient by id use case', () => {
  let sut: GetByIdRecipientUseCase
  let inMemoryRecipientRepository: InMemoryRecipientRepository

  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new GetByIdRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be to get delivery man by id', async () => {
    const recipientCreate = makeRecipient()
    inMemoryRecipientRepository.create(recipientCreate)

    const { recipient } = await sut.execute({ recipientId : recipientCreate.id.toString()})

    expect(recipient.id.toString()).toEqual(recipientCreate.id.toString())
  })

  it('not should be to delete of recipient account with non exists admin id', async () => {
    const recipientCreate = makeRecipient()
    inMemoryRecipientRepository.create(recipientCreate)

    expect(async () => {
      await sut.execute({ recipientId : 'wrong-id' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})