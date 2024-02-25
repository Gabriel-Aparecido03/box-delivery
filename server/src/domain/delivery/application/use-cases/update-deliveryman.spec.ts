import { makeAdmin } from "test/factories/make-admin"
import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { UpdateDeliverymanUseCase } from "./update-deliveryman"

describe('register packages use case', () => {
  let sut: UpdateDeliverymanUseCase
  let inMemoryAdminRepository: InMemoryAdminRepository
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    sut = new UpdateDeliverymanUseCase(
      inMemoryDeliverymanRepository,
      inMemoryAdminRepository,
    )
  })

  it('should be to update a deliveryman ', async () => {
    const admin = makeAdmin()
    inMemoryAdminRepository.create(admin)

    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const result = await sut.execute({
      adminId: admin.id.toString(),
      coordinate: { latitude: -23.494656, longitude: -47.5136 },
      documentNumber : '37740682080',
      deliverymanId : deliveryman.id.toString()
    })

    expect(result).toBeUndefined()
    expect(inMemoryDeliverymanRepository.items[0].documentNumber.value).toEqual( '37740682080')
  })
})