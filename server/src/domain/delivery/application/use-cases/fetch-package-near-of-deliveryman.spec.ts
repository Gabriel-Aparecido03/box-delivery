import { InMemoryPackageRepository } from "test/in-memory-repository/in-memory-package-repository"
import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { FetchPackageNearOfDeliverymanUseCase } from "./fetch-package-near-of-deliveryman"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { makePackage } from "test/factories/make-package"
import { Coordinate } from "../../enterprise/entities/value-object/coordinate"
import { ResourceNotFound } from "./errors/resource-not-found"

describe('fetch package near of deliveryman use case', () => {
  let sut: FetchPackageNearOfDeliverymanUseCase
  let inMemoryPackageRepository: InMemoryPackageRepository
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryPackageRepository = new InMemoryPackageRepository()
    sut = new FetchPackageNearOfDeliverymanUseCase(inMemoryDeliverymanRepository, inMemoryPackageRepository)
  })

  it('should be to fetch packages near of deliverman ', async () => {

    const deliveryman = makeDeliveryman({
      coordinate: Coordinate.create({ latitude: -23.494656, longitude: -47.5136 })
    })

    inMemoryDeliverymanRepository.items.push(deliveryman)

    const packageOrder = makePackage({
      coordinates: Coordinate.create({ latitude: -23.494656, longitude: -47.5136 }),
      deliveryManId: deliveryman.id
    })

    inMemoryPackageRepository.items.push(packageOrder)

    inMemoryPackageRepository.items.push(makePackage({
      coordinates: Coordinate.create({ latitude: -10.494656, longitude: -10.5136 })
    }))

    const coordinates = Coordinate.create({ latitude: -23.494656, longitude: -47.5136 })

    const { packages } = await sut.execute({ deliverymanId: deliveryman.id.toString() })

    expect(packages).toHaveLength(1)
  })

  it('not should be to fetch packages near of deliverman with non exists deliveryman ', async () => {

    const deliveryman = makeDeliveryman({
      coordinate: Coordinate.create({ latitude: -23.494656, longitude: -47.5136 })
    })

    inMemoryDeliverymanRepository.items.push(deliveryman)

    const packageOrder = makePackage({
      coordinates: Coordinate.create({ latitude: -23.494656, longitude: -47.5136 })
    })
    inMemoryPackageRepository.items.push(packageOrder)
    inMemoryPackageRepository.items.push(makePackage({
      coordinates: Coordinate.create({ latitude: -10.494656, longitude: -10.5136 })
    }))
    const coordinates = Coordinate.create({ latitude: -23.494656, longitude: -47.5136 })
    expect(async () => {
      await sut.execute({ deliverymanId: 'wrong-id' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})