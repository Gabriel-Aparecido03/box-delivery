import { InMemoryPackageRepository } from "test/in-memory-repository/in-memory-package-repository"
import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { makePackage } from "test/factories/make-package"
import { FetchPackageOfDeliverymanUseCase } from "./fetch-packages-of-deliveryman"
import { ResourceNotFound } from "./errors/resource-not-found"

describe('fetch packages of deliveryman use case', () => {
  let sut: FetchPackageOfDeliverymanUseCase
  let inMemoryPackageRepository: InMemoryPackageRepository
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryPackageRepository = new InMemoryPackageRepository()
    sut = new FetchPackageOfDeliverymanUseCase(inMemoryDeliverymanRepository, inMemoryPackageRepository)
  })

  it('should be to fetch packages of deliveryman ', async () => {

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    for (let index = 0; index < 5 ; index++) {
      const packageOrder = makePackage({
        deliveryManId : deliveryman.id
      })
      inMemoryPackageRepository.items.push(packageOrder)
    }

    const { packages } = await sut.execute({ deliverymanId: deliveryman.id.toString() })

    expect(packages).toHaveLength(5)
  })

  it('not should be to fetch packages of deliveryman with non exists deliveryman', async () => {

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    for (let index = 0; index < 5 ; index++) {
      const packageOrder = makePackage({
        deliveryManId : deliveryman.id
      })
      inMemoryPackageRepository.items.push(packageOrder)
    }
    expect(async () => {
      await sut.execute({ deliverymanId: 'wrong-id' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})