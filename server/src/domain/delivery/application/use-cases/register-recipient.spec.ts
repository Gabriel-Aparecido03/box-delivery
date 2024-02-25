import { makeAdmin } from "test/factories/make-admin"
import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { NotAllowed } from "./errors/not-allowed"
import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { InMemoryRecipientRepository } from "test/in-memory-repository/in-memory-recipient-repository"
import { makeRecipient } from "test/factories/make-recipient"
import { RegisterRecipientUseCase } from "./register-recipient"
import { InvalidDocumentNumberError } from "./errors/invalid-document-number"
import { DocumentNumber } from "../../enterprise/entities/value-object/document-number"
import { RepeatedDocumentNumberError } from "./errors/repeated-document-number"

describe('register packages use case', () => {
  let sut: RegisterRecipientUseCase
  let inMemoryAdminRepository: InMemoryAdminRepository
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
  let inMemoryRecipientRepository: InMemoryRecipientRepository
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new RegisterRecipientUseCase(
      inMemoryRecipientRepository,
      inMemoryAdminRepository,
    )
  })

  it('should be to register of package', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)


    const result = await sut.execute({
      adminId: admin.id.toString(),
      coordinates: { latitude: -23.494656, longitude: -47.5136 },
      documentNumber: '37740682080',
      name: 'lorem'
    })

    expect(result).toBeUndefined()
    expect(inMemoryRecipientRepository.items).toHaveLength(1)
  })


  it('not should be to register of package with invalid admin id', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    expect(async () => {
      await sut.execute({
        adminId: 'wrong admin id',
        coordinates: { latitude: -23.494656, longitude: -47.5136 },
        documentNumber: '37740682080',
        name: 'lorem'
      })
    }).rejects.toBeInstanceOf(NotAllowed)
  })

  it('not should be to register of package with invalid document number id', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    expect(async () => {
      await sut.execute({
        adminId: admin.id.toString(),
        coordinates: { latitude: -23.494656, longitude: -47.5136 },
        documentNumber: 'invalid document number',
        name: 'lorem'
      })
    }).rejects.toBeInstanceOf(InvalidDocumentNumberError)
  })

  it('not should be to register of package with repeated document number id', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const recipient = makeRecipient({ documentNumber: DocumentNumber.create('37740682080') })
    inMemoryRecipientRepository.items.push(recipient)

    expect(async () => {
      await sut.execute({
        adminId: admin.id.toString(),
        coordinates: { latitude: -23.494656, longitude: -47.5136 },
        documentNumber: '37740682080',
        name: 'lorem'
      })
    }).rejects.toBeInstanceOf(RepeatedDocumentNumberError)
  })
})