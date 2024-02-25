import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { InMemoryPackageRepository } from "test/in-memory-repository/in-memory-package-repository"
import { makePackage } from "test/factories/make-package"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { InMemoryAttachmentsRepository } from "test/in-memory-repository/in-memory-attachment-repository"
import { makeAttachment } from "test/factories/make-attachment"
import { MakePackageReturnedUseCase } from "./make-package-as-returned"
import { NotAllowed } from "./errors/not-allowed"

describe('Make package as delivered', () => {
  let sut: MakePackageReturnedUseCase
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
  let inMemoryPackageRepository: InMemoryPackageRepository
  let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository

  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryPackageRepository = new InMemoryPackageRepository()
    sut = new MakePackageReturnedUseCase(inMemoryDeliverymanRepository, inMemoryPackageRepository)
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
  })

  it('should be to make packages as delivered', async () => {
    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const packageOrder = makePackage({ deliveryManId: deliveryman.id })
    inMemoryPackageRepository.items.push(packageOrder)

    const attachmentsIds = makeAttachment()
    inMemoryAttachmentsRepository.items.push(attachmentsIds)

    const result = await sut.execute({
      deliverymanId: deliveryman.id.toString(),
      packageId: packageOrder.id.toString()
    })

    expect(result).toBeUndefined()
    expect(inMemoryPackageRepository.items[0].status.value.status).toEqual('returned')
  })

  it('not should be to make packages as delivered when deliveryman id dont match with package deliveryman id', async () => {
    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const packageOrder = makePackage()
    inMemoryPackageRepository.items.push(packageOrder)

    expect(async () => {
      await sut.execute({
        deliverymanId: deliveryman.id.toString(),
        packageId: packageOrder.id.toString()
      })
    }).rejects.toBeInstanceOf(NotAllowed) 
  })
})