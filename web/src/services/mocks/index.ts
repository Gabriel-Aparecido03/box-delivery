import { setupWorker } from 'msw/browser'
import { adminAuthenticateWithMocking } from './session/admin-authtenticate.mock'
import { deliverymanAuthtenticateWithMocking } from './session/deliveryman-authenticate.mock'
import { fetchDeliverymanWithMock } from './session/fetch-deliverymans.mock'
import { meMocking } from './session/me'
import { addRecipientMock } from './recipients/add-recipient.mock'
import { deleteRecipientMock } from './recipients/delete-recipient.mock'
import { fetchRecipientMock } from './recipients/fetch-recipients.mock'
import { updateRecipientMock } from './recipients/update-recipient.mock'
import { getByRecipientMock } from './recipients/get-by-recipient.mock'
import { deletePackageMock } from './packages/delete-package.mock'
import { fetchAllPackagesMock } from './packages/fetch-all-packages.mock'
import { makePackageAsDeliveredMock } from './packages/make-package-as-delivered.mock'
import { makePackageAsPickUpMock } from './packages/make-package-as-pickup.mock'
import { makePackageAsReturnedMock } from './packages/make-package-as-returned.mock'
import { myPackagesPackagesMock } from './packages/my-packages.mock'
import { registerRecipientMock } from './packages/register-packages.mock'
import { registerDeliverymanMock } from './deliveryman/add-deliveryman.mock'
import { changePasswordDeliverymanMock } from './deliveryman/change-password.mock'
import { deleteDeliverymanMock } from './deliveryman/delete-deliveryman.mock'
import { getBDeliverymanIdMock } from './deliveryman/get-deliveryman-by-id.mock'
import { updateDeliverymanMock } from './deliveryman/update-deliveryman.mock'

export const worker = setupWorker(
  adminAuthenticateWithMocking,
  deliverymanAuthtenticateWithMocking,
  meMocking,
  fetchDeliverymanWithMock,
  addRecipientMock,
  deleteRecipientMock,
  fetchRecipientMock,
  updateRecipientMock,
  getByRecipientMock,
  deletePackageMock,
  fetchAllPackagesMock,
  makePackageAsDeliveredMock,
  makePackageAsPickUpMock,
  makePackageAsReturnedMock,
  myPackagesPackagesMock,
  registerRecipientMock,
  registerDeliverymanMock,
  changePasswordDeliverymanMock,
  deleteDeliverymanMock,
  getBDeliverymanIdMock,
  updateDeliverymanMock
)

export async function enalbleMSW() {
  if (import.meta.env.MODE !== "test") return
  await worker.start()
}