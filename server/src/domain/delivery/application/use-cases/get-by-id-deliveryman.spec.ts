import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { ResourceNotFound } from "./errors/resource-not-found"
import { GetByIdDeliverymanUseCase } from "./get-by-id-deliveryman"

describe('get deliveryman by id use case', () => {
  let sut: GetByIdDeliverymanUseCase
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository

  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    sut = new GetByIdDeliverymanUseCase(inMemoryDeliverymanRepository)
  })

  it('should be to get delivery man by id', async () => {
    const deliverymanCreate = makeDeliveryman()
    inMemoryDeliverymanRepository.create(deliverymanCreate)

    const { deliveryman } = await sut.execute({ deliverymanId : deliverymanCreate.id.toString()})

    expect(deliveryman.id.toString()).toEqual(deliverymanCreate.id.toString())
  })

  it('not should be to delete of deliveryman account with non exists admin id', async () => {
    const deliverymanCreate = makeDeliveryman()
    inMemoryDeliverymanRepository.create(deliverymanCreate)

    expect(async () => {
      await sut.execute({ deliverymanId : 'wrong-id' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})