import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { AuthenticateAdminUseCase } from "./authenticate-admin"
import { InTestEncrypter } from "test/cryptoghphay/in-test-encrypter"
import { InTestHashComparer } from "test/cryptoghphay/in-test-hash-comparer"
import { makeAdmin } from "test/factories/make-admin"
import { InvalidCredentials } from "./errors/invalid-credentials"

describe('Authtenticate admin use case', () => {
  let sut: AuthenticateAdminUseCase
  let hasherComparer: InTestHashComparer
  let encrypter: InTestEncrypter
  let inMemoryAdminRepository: InMemoryAdminRepository

  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    hasherComparer = new InTestHashComparer()
    encrypter = new InTestEncrypter()
    sut = new AuthenticateAdminUseCase(inMemoryAdminRepository, hasherComparer, encrypter)
  })

  it('should be to authtenticate of admin account', async () => {
    const admin = makeAdmin({ password: 'password-hashed' })
    inMemoryAdminRepository.create(admin)
    const result = await sut.execute({ documentNumber: admin.documentNumber.value, password: 'password' })

    expect(result).toEqual(
      expect.objectContaining({
        access_token : expect.any(String)
      })
    )
  })

  it('not should be to authtenticate of admin account with wrong documentNumber', async () => {
    const admin = makeAdmin({ password: 'password-hashed' })
    inMemoryAdminRepository.create(admin)
    expect( async () =>{
      await sut.execute({ documentNumber: 'wrong', password: 'password' })
    }).rejects.toBeInstanceOf(InvalidCredentials)
  })

  it('not should be to authtenticate of admin account with wrong password', async () => {
    const admin = makeAdmin({ password: 'password-hashed' })
    inMemoryAdminRepository.create(admin)
    expect( async () =>{
      await sut.execute({ documentNumber: admin.documentNumber.value, password: 'wrong-password' })
    }).rejects.toBeInstanceOf(InvalidCredentials)
  })
})