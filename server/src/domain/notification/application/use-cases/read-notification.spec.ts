import { makeNotification } from "test/factories/make-notification"
import { ReadNotificationUseCase } from "./read-notification"
import { InMemoryNotificationRepository } from "test/in-memory-repository/in-memory-notification-repository"
import { NotAllowed } from "src/domain/delivery/application/use-cases/errors/not-allowed"
import { ResourceNotFound } from "src/domain/delivery/application/use-cases/errors/resource-not-found"

describe('Read Notification - Unit', () => {

  let inMemoryNotificationRepository : InMemoryNotificationRepository
  let sut: ReadNotificationUseCase

  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be to read a notification', async () => {
    const notification = makeNotification()
    inMemoryNotificationRepository.items.push(notification)

    await sut.execute({
      notificationId : notification.id.toString(),
      recipientId : notification.recipientId.toString()
    })

    expect(inMemoryNotificationRepository.items[0].readAt).toBeTruthy()
  })

  it('not should be to read a notification of another recipient', async () => {
    const notification = makeNotification()
    inMemoryNotificationRepository.items.push(notification)

    expect(async () => {
      await sut.execute({
        notificationId : notification.id.toString(),
        recipientId : 'wrong-recipient'
      })
    }).rejects.toBeInstanceOf(NotAllowed)
  })

  it('not should be to read a notification with dont exists id', async () => {
    const notification = makeNotification()
    inMemoryNotificationRepository.items.push(notification) 

    expect(async () => {
      await sut.execute({
        notificationId : 'wrong-id',
        recipientId : notification.recipientId.toString()
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})