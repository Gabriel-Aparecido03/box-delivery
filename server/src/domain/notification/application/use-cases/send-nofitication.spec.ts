import { InMemoryNotificationRepository } from "test/in-memory-repository/in-memory-notification-repository"
import { SendNotificationUseCase } from "./send-notification"

describe('Create Notification - Unit', () => {

  let inMemoryNotificationRepository : InMemoryNotificationRepository
  let sut: SendNotificationUseCase

  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be to create a notification', async () => {
    
    await sut.execute({
      content : 'lorem-content',
      recipientId : '01',
      title : 'lorem-title'
    })

    expect(inMemoryNotificationRepository.items).toHaveLength(1)
    expect(inMemoryNotificationRepository.items[0].content).toEqual('lorem-content')
  })

})