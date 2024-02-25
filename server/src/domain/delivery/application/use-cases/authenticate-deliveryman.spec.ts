import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { AuthenticateDeliverymanUseCase } from "./authenticate-deliveryman"
import { InTestEncrypter } from "test/cryptoghphay/in-test-encrypter"
import { InTestHashComparer } from "test/cryptoghphay/in-test-hash-comparer"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { InvalidCredentials } from "./errors/invalid-credentials"

describe('Authtenticate deliveryman use case', () => {
  let sut: AuthenticateDeliverymanUseCase
  let hasherComparer: InTestHashComparer
  let encrypter: InTestEncrypter
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository

  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    hasherComparer = new InTestHashComparer()
    encrypter = new InTestEncrypter()
    sut = new AuthenticateDeliverymanUseCase(inMemoryDeliverymanRepository, hasherComparer, encrypter)
  })

  it('should be to authtenticate of deliveryman account', async () => {
    const deliveryman = makeDeliveryman({ password: 'password-hashed' })
    inMemoryDeliverymanRepository.create(deliveryman)
    const result = await sut.execute({ documentNumber: deliveryman.documentNumber.value, password: 'password' })

    expect(result).toEqual(
      expect.objectContaining({
        access_token : expect.any(String)
      })
    )
  })

  it('not should be to authtenticate of deliveryman account with wrong documentNumber', async () => {
    const deliveryman = makeDeliveryman({ password: 'password-hashed' })
    inMemoryDeliverymanRepository.create(deliveryman)
    expect( async () =>{
      await sut.execute({ documentNumber: 'wrong', password: 'password' })
    }).rejects.toBeInstanceOf(InvalidCredentials)
  })

  it('not should be to authtenticate of deliveryman account with wrong password', async () => {
    const deliveryman = makeDeliveryman({ password: 'password-hashed' })
    inMemoryDeliverymanRepository.create(deliveryman)
    expect( async () =>{
      await sut.execute({ documentNumber: deliveryman.documentNumber.value, password: 'wrong-password' })
    }).rejects.toBeInstanceOf(InvalidCredentials)
  })
})