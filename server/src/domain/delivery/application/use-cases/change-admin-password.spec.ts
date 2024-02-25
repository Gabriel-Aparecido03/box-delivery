import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { makeAdmin } from "test/factories/make-admin"
import { ChangeAdminPasswordUseCase } from "./change-admin-password"
import { InTextHashGenerator } from "test/cryptoghphay/in-test-hash-generator"
import { ResourceNotFound } from "./errors/resource-not-found"

describe('Change admin passoword use case', () => {
  let sut: ChangeAdminPasswordUseCase
  let hasherGenerator: InTextHashGenerator
  let inMemoryAdminRepository: InMemoryAdminRepository

  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    hasherGenerator = new InTextHashGenerator()
    sut = new ChangeAdminPasswordUseCase(inMemoryAdminRepository,hasherGenerator)
  })

  it('should be to change password of admin account', async () => {
    const admin = makeAdmin({ password: 'password-hashed' })
    inMemoryAdminRepository.create(admin)
    const result = await sut.execute({ adminId : admin.id.toString() , password : 'new-password' })
    expect(result).toBeUndefined()
    expect(inMemoryAdminRepository.items[0].password).toEqual('new-password-hashed')
  })

  it('not should be to change password of admin account', async () => {
    const admin = makeAdmin({ password: 'password-hashed' })
    inMemoryAdminRepository.create(admin)

    expect(async () => {
      await sut.execute({ adminId : 'wrong-id' , password : 'new-password' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})