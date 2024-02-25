import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DocumentNumber } from "src/domain/delivery/enterprise/entities/value-object/document-number";
import { Status } from "src/domain/delivery/enterprise/entities/value-object/status";
import { AppModule } from "src/infra/app.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { MakeAdminE2E } from "test/e2e-factories/make-admin.e2e";
import { MakeDeliverymanE2E } from "test/e2e-factories/make-deliveryman.e2e";
import { MakePackageE2E } from "test/e2e-factories/make-package.e2e";
import { MakeRecipientE2E } from "test/e2e-factories/make-recipient.e2";
import { makeAdmin } from "test/factories/make-admin";
import { makeDeliveryman } from "test/factories/make-deliveryman";
import { makePackage } from "test/factories/make-package";
import { makeRecipient } from "test/factories/make-recipient";
import { Test } from '@nestjs/testing';
import request from 'supertest';
describe('Fetch Notifications - E2E', () => {
  let app: INestApplication;

  let adminFactory: MakeAdminE2E
  let deliverymanFactory: MakeDeliverymanE2E
  let recipientFactory: MakeRecipientE2E
  let jwt: JwtService
  let packageFactory: MakePackageE2E
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MakeAdminE2E, MakeDeliverymanE2E, MakeRecipientE2E, MakePackageE2E]
    }).compile()
    app = moduleRef.createNestApplication();

    adminFactory = moduleRef.get(MakeAdminE2E)
    deliverymanFactory = moduleRef.get(MakeDeliverymanE2E)
    recipientFactory = moduleRef.get(MakeRecipientE2E)
    packageFactory = moduleRef.get(MakePackageE2E)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    await app.init();
  });

  test(`[POST] /notifications/`, async () => {

    const data = makeAdmin()
    await adminFactory.execute(data)

    const deliverman = makeDeliveryman({ documentNumber: DocumentNumber.create('98765432100') })
    await deliverymanFactory.execute(deliverman)

    const recipient = makeRecipient({ documentNumber: DocumentNumber.create('12365498700') })
    await recipientFactory.execute(recipient)

    const packageOrder = makePackage({ deliveryManId: deliverman.id, recipientId: recipient.id, status: Status.create({ changedAt: new Date(), status: 'delivered' }) })
    await packageFactory.execute(packageOrder)

    const accessToken = jwt.sign({ sub: recipient.id.toString() })
    await request(app.getHttpServer())
      .patch(`/package/status/pickup/${packageOrder.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        deliverymanId: deliverman.id.toString(),
      })

    const { id } = await prisma.notification.findFirst({
      where: {
        user_id: recipient.id.toString(),
      },
    })

    const response = await request(app.getHttpServer())
      .patch(`/notifications/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
  })
})
