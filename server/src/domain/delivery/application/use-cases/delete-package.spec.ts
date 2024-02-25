import { makeAdmin } from "test/factories/make-admin"
import { makePackage } from "test/factories/make-package"
import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { InMemoryPackageRepository } from "test/in-memory-repository/in-memory-package-repository"
import { NotAllowed } from "./errors/not-allowed"
import { ResourceNotFound } from "./errors/resource-not-found"
import { DeletePackageUseCase } from "./delete-package"

describe('delete packages use case', () => {
  let sut: DeletePackageUseCase
  let inMemoryPackageRepository: InMemoryPackageRepository
  let inMemoryAdminRepository: InMemoryAdminRepository

  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    sut = new DeletePackageUseCase(inMemoryPackageRepository, inMemoryAdminRepository)
  })

  it('should be to delete of package', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const packageOrder = makePackage()
    inMemoryPackageRepository.create(packageOrder)

    const result = await sut.execute({ adminId: admin.id.toString(), packageId: packageOrder.id.toString() })

    expect(result).toBeUndefined()
    expect(inMemoryPackageRepository.items).toHaveLength(0)
  })

  it('not should be to delete of package with non exists adminId', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const packageOrder = makePackage()
    inMemoryPackageRepository.create(packageOrder)

    expect(async () => {
      await sut.execute({ adminId: 'wrong-admin-id', packageId: packageOrder.id.toString() })
    }).rejects.toBeInstanceOf(NotAllowed)
  })

  it('not should be to delete of package account with non exists package id', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const packageOrder = makePackage()
    inMemoryPackageRepository.create(packageOrder)
    
    expect(async () => {
      await sut.execute({ adminId: admin.id.toString(), packageId: 'wrong-id' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})