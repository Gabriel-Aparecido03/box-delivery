import { makeAdmin } from "test/factories/make-admin"
import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { RegisterDeliverymanUseCase } from "./register-deliveryman"
import { InTextHashGenerator } from "test/cryptoghphay/in-test-hash-generator"
import { InvalidDocumentNumberError } from "./errors/invalid-document-number"
import { InvalidCoordinates } from "./errors/invalid-coordinates"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { DocumentNumber } from "../../enterprise/entities/value-object/document-number"
import { RepeatedDocumentNumberError } from "./errors/repeated-document-number"

describe('register deliveryman use case', () => {
  let sut: RegisterDeliverymanUseCase
  let inMemoryAdminRepository: InMemoryAdminRepository
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
  let hashGenerator: InTextHashGenerator
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    hashGenerator = new InTextHashGenerator()
    sut = new RegisterDeliverymanUseCase(
      inMemoryDeliverymanRepository,
      inMemoryAdminRepository,
      hashGenerator
    )
  })

  it('should be to register a deliveryman', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const result = await sut.execute({
      adminId: admin.id.toString(),
      coordinates: { latitude: -23.494656, longitude: -47.5136 },
      documentNumber: '37740682080',
      name: 'lorem',
      password: '123'
    })

    expect(result).toBeUndefined()
    expect(inMemoryDeliverymanRepository.items).toHaveLength(1)
  })

  it('not should be to register a deliveryman with invalid document number', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    expect(async () => {
      await sut.execute({
        adminId: admin.id.toString(),
        coordinates: { latitude: -23.494656, longitude: -47.5136 },
        documentNumber: 'invalid-document-number',
        name: 'lorem',
        password: '123'
      })
    }).rejects.toBeInstanceOf(InvalidDocumentNumberError)
  })

  it('not should be to register a deliveryman with invalid coordinates number', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    expect(async () => {
      await sut.execute({
        adminId: admin.id.toString(),
        coordinates: { latitude: -193.494656, longitude: -100.5136 },
        documentNumber: '37740682080',
        name: 'lorem',
        password: '123'
      })
    }).rejects.toBeInstanceOf(InvalidCoordinates)
  })

  it('not should be to register a deliveryman with repeaeted document number', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman({ documentNumber : DocumentNumber.create('37740682080')})
    inMemoryDeliverymanRepository.items.push(deliveryman)

    expect(async () => {
      await sut.execute({
        adminId: admin.id.toString(),
        coordinates: { latitude: -193.494656, longitude: -100.5136 },
        documentNumber: '37740682080',
        name: 'lorem',
        password: '123'
      })
    }).rejects.toBeInstanceOf(RepeatedDocumentNumberError)
  })
})