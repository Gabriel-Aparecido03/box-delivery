import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthenticateDeliverymanUseCase } from "src/domain/delivery/application/use-cases/authenticate-deliveryman";
import { AuthModule } from "../auth/auth.module";
import { AuthtenticateDeliverymanController } from "./controllers/session/authenticate-deliveryman.controller";
import { AuthtenticateAdminController } from "./controllers/session/authenticate-admin.controller";
import { AuthenticateAdminUseCase } from "src/domain/delivery/application/use-cases/authenticate-admin";
import { RegisterAdminUseCase } from "src/domain/delivery/application/use-cases/register-admin";
import { RegisterAdminController } from "./controllers/session/register-admin.controller";
import { RegisterDeliverymanController } from "./controllers/session/register-deliveryman.controller";
import { RegisterDeliverymanUseCase } from "src/domain/delivery/application/use-cases/register-deliveryman";
import { DeleteDeliverymanController } from "./controllers/deliveryman/delete-deliveryman.controller";
import { DeleteDeliverymanUseCase } from "src/domain/delivery/application/use-cases/delete-deliveryman";
import { RegisterRecipientController } from "./controllers/recipient/create-recipient.controller";
import { RegisterRecipientUseCase } from "src/domain/delivery/application/use-cases/register-recipient";
import { DeleteRecipientUseCase } from "src/domain/delivery/application/use-cases/delete-recipient";
import { DeleteRecipientController } from "./controllers/recipient/delete-recipient.controller";
import { GetByIdDeliverymanUseCase } from "src/domain/delivery/application/use-cases/get-by-id-deliveryman";
import { GetByIdDeliverymanController } from "./controllers/deliveryman/get-by-id-deliveryman.controller";
import { ChangeAdminPasswordUseCase } from "src/domain/delivery/application/use-cases/change-admin-password";
import { ChangePasswordAdminController } from "./controllers/admin/change-password-admin.controller";
import { UpdateliverymanController } from "./controllers/deliveryman/update-deliveryman.controller";
import { UpdateDeliverymanUseCase } from "src/domain/delivery/application/use-cases/update-deliveryman";
import { ChangePasswordDeliverymanController } from "./controllers/deliveryman/change-password-deliveryman.controller";
import { ChangeDeleverymanPasswordUseCase } from "src/domain/delivery/application/use-cases/change-deliveryman-password";
import { GetByIdRecipientUseCase } from "src/domain/delivery/application/use-cases/get-by-id-recipient";
import { UpdateRecipientUseCase } from "src/domain/delivery/application/use-cases/update-recipient";
import { GetByIdRecipientController } from "./controllers/recipient/get-by-id-recipient.controller";
import { UpdateRecipientController } from "./controllers/recipient/update-recipient.controller";
import { RegisterPackageController } from "./controllers/package/create-package.controller";
import { RegisterPackageUseCase } from "src/domain/delivery/application/use-cases/register-package";
import { DeletePackageController } from "./controllers/package/delete-package.controller";
import { DeletePackageUseCase } from "src/domain/delivery/application/use-cases/delete-package";
import { FetchPackageOfDeliverymanController } from "./controllers/package/fetch-package-of-deliveryman.controller";
import { FetchPackageOfDeliverymanUseCase } from "src/domain/delivery/application/use-cases/fetch-packages-of-deliveryman";
import { FetchPackageNearOfDeliverymanUseCase } from "src/domain/delivery/application/use-cases/fetch-package-near-of-deliveryman";
import { FetchPackageNearOfMeController } from "./controllers/package/fetch-packages-near-of-me.controller";
import { FetchPackageOfRecipientController } from "./controllers/package/fetch-packages-of-recipient.controller";
import { FetchPackageOfRecipientUseCase } from "src/domain/delivery/application/use-cases/fetch-my-packages-recipient";
import { GetStatusOfPackageUseCase } from "src/domain/delivery/application/use-cases/get-status-by-package-code";
import { GetStatusPackageController } from "./controllers/package/get-status-package.controller";
import { MakePackageAsDeliveredController } from "./controllers/package/make-package-as-delivered";
import { MakePackageAsDeliveredUseCase } from "src/domain/delivery/application/use-cases/make-package-as-delivered";
import { MakePackageReturnedUseCase } from "src/domain/delivery/application/use-cases/make-package-as-returned";
import { MakePackagePickUpUseCase } from "src/domain/delivery/application/use-cases/make-package-as-pick-up";
import { MakePackageAsReturnedController } from "./controllers/package/make-package-as-returned.controller";
import { UpdatePackageController } from "./controllers/package/update-package.controller";
import { UpdatePackageUseCase } from "src/domain/delivery/application/use-cases/update-package";
import { MakePackageAsPickUpController } from "./controllers/package/make-package-as-pick-up.controller";
import { FetchNotificationController } from "./controllers/notification/fetch-notification.controller";
import { FetchNotificationUseCase } from "src/domain/notification/application/use-cases/fetch-notification";
import { ReadNotificationUseCase } from "src/domain/notification/application/use-cases/read-notification";
import { ReadNotificationController } from "./controllers/notification/read-notification.controller";
import { SendNotificationUseCase } from "src/domain/notification/application/use-cases/send-notification";
import { GetByIdAdminUseCase } from "src/domain/delivery/application/use-cases/get-by-id-admin";
import { MeController } from "./controllers/session/me.controller";
import { FetchDeliverymansController } from "./controllers/deliveryman/fetch-deliverymans.controller";
import { FetchDeliverymansUseCase } from "src/domain/delivery/application/use-cases/fetch-deliverymans";
import { FetchRecipientsUseCase } from "src/domain/delivery/application/use-cases/fetch-recipients";
import { FetchRecipientsController } from "./controllers/recipient/fetch-all-recipients";
import { FetchPackageController } from "./controllers/package/fetch-all-package";
import { FetchPackagesUseCase } from "src/domain/delivery/application/use-cases/fetch-all-packages";


@Module({
  imports: [DatabaseModule, CryptographyModule,AuthModule],
  controllers: [
    ChangePasswordAdminController,
    MeController,
    AuthtenticateDeliverymanController,
    AuthtenticateAdminController,
    RegisterAdminController,
    RegisterDeliverymanController,
    ChangePasswordDeliverymanController,
    DeleteDeliverymanController,
    FetchDeliverymansController,
    GetByIdDeliverymanController,
    UpdateliverymanController,
    RegisterRecipientController,
    DeleteRecipientController,
    GetByIdRecipientController,
    UpdateRecipientController,
    RegisterPackageController,
    DeletePackageController,
    FetchPackageOfDeliverymanController,
    FetchPackageNearOfMeController,
    FetchPackageOfRecipientController,
    GetStatusPackageController,
    MakePackageAsDeliveredController,
    MakePackageAsPickUpController,
    MakePackageAsReturnedController,
    UpdatePackageController,
    FetchNotificationController,
    ReadNotificationController,
    FetchRecipientsController,
    FetchPackageController
  ],
  providers: [
    ChangeAdminPasswordUseCase,
    GetByIdAdminUseCase,
    AuthenticateDeliverymanUseCase,
    AuthenticateAdminUseCase,
    RegisterAdminUseCase,
    RegisterDeliverymanUseCase,
    ChangeDeleverymanPasswordUseCase,
    DeleteDeliverymanUseCase,
    GetByIdDeliverymanUseCase,
    UpdateDeliverymanUseCase,
    RegisterRecipientUseCase,
    DeleteRecipientUseCase,
    GetByIdRecipientUseCase,
    UpdateRecipientUseCase,
    RegisterPackageUseCase,
    FetchDeliverymansUseCase,
    DeletePackageUseCase,
    FetchPackageOfDeliverymanUseCase,
    FetchPackageNearOfDeliverymanUseCase,
    FetchPackageOfRecipientUseCase,
    GetStatusOfPackageUseCase,
    MakePackageAsDeliveredUseCase,
    MakePackagePickUpUseCase,
    MakePackageReturnedUseCase,
    UpdatePackageUseCase,
    FetchNotificationUseCase,
    ReadNotificationUseCase,
    SendNotificationUseCase,
    FetchRecipientsUseCase,
    FetchPackagesUseCase
  ],
  exports: []
})
export class HttpModule { }