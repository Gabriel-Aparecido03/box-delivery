import { UpdatePackageUseCase } from "src/domain/delivery/application/use-cases/update-package"
import { InMemoryAdminRepository } from "test/in-memory-repository/in-memory-admin-repository"
import { InMemoryDeliverymanRepository } from "test/in-memory-repository/in-memory-deliveryman-repository"
import { InMemoryPackageRepository } from "test/in-memory-repository/in-memory-package-repository"
import { InMemoryRecipientRepository } from "test/in-memory-repository/in-memory-recipient-repository"
import { SendNotificationUseCase } from "../use-cases/send-notification"
import { InMemoryNotificationRepository } from "test/in-memory-repository/in-memory-notification-repository"
import { MockInstance } from "vitest"
import { OnStatusChanged } from "./on-status-change"
import { makeAdmin } from "test/factories/make-admin"
import { makeDeliveryman } from "test/factories/make-deliveryman"
import { makeRecipient } from "test/factories/make-recipient"
import { makePackage } from "test/factories/make-package"
import { waitFor } from "test/utils/wait-for"
import { Status } from "src/domain/delivery/enterprise/entities/value-object/status"

describe('On status cahnge', () => {
  let sut: UpdatePackageUseCase
  let inMemoryPackageRepository: InMemoryPackageRepository
  let inMemoryAdminRepository: InMemoryAdminRepository
  let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
  let inMemoryRecipientRepository: InMemoryRecipientRepository
  let inMemoryNotificationRepository: InMemoryNotificationRepository
  let sendNotification: SendNotificationUseCase
  let spy: MockInstance
  let onStatusChange: OnStatusChanged

  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sendNotification = new SendNotificationUseCase(inMemoryNotificationRepository)
    spy = vi.spyOn(sendNotification, 'execute')
    onStatusChange = new OnStatusChanged(sendNotification)
  })

  it('should to send a notification when an answer is created', async () => {
    const admin = makeAdmin()
    const deliveryman = makeDeliveryman()
    const recipient = makeRecipient({ coordinate: deliveryman.coordinate })
    const packageOrder = makePackage({ coordinates: deliveryman.coordinate, status: Status.create({ changedAt: new Date(), status: 'returned' }) })

    inMemoryAdminRepository.create(admin)
    inMemoryDeliverymanRepository.create(deliveryman)
    inMemoryRecipientRepository.create(recipient)
    inMemoryPackageRepository.create(packageOrder)
    inMemoryPackageRepository.changeStatusReturned(packageOrder)

    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
    })
  })
})