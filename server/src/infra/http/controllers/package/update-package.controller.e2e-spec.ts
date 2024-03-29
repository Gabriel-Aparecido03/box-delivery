import { INestApplication } from "@nestjs/common";
import { AppModule } from "src/infra/app.module";
import { MakeAdminE2E } from "test/e2e-factories/make-admin.e2e";
import { Test } from '@nestjs/testing';
import { DatabaseModule } from "src/infra/database/database.module";
import { makeAdmin } from "test/factories/make-admin";
import { DocumentNumber } from "src/domain/delivery/enterprise/entities/value-object/document-number";
import request from 'supertest';
import { JwtService } from "@nestjs/jwt";
import { MakeDeliverymanE2E } from "test/e2e-factories/make-deliveryman.e2e";
import { makeDeliveryman } from "test/factories/make-deliveryman";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { makeRecipient } from "test/factories/make-recipient";
import { MakeRecipientE2E } from "test/e2e-factories/make-recipient.e2";
import { makePackage } from "test/factories/make-package";
import { MakePackageE2E } from "test/e2e-factories/make-package.e2e";
import { Status } from "src/domain/delivery/enterprise/entities/value-object/status";

describe('Create package - E2E', () => {

  let app: INestApplication;
  let adminFactory: MakeAdminE2E
  let deliverymanFactory: MakeDeliverymanE2E
  let jwt: JwtService
  let prisma: PrismaService
  let recipientFactory: MakeRecipientE2E
  let packageFactory : MakePackageE2E

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MakeAdminE2E, MakeDeliverymanE2E, MakeRecipientE2E, MakePackageE2E]
    }).compile()
    app = moduleRef.createNestApplication();
    adminFactory = moduleRef.get(MakeAdminE2E)
    deliverymanFactory = moduleRef.get(MakeDeliverymanE2E)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)
    recipientFactory = moduleRef.get(MakeRecipientE2E)
    packageFactory = moduleRef.get(MakePackageE2E)
    await app.init();
  });

  test('[PUT] package/:id', async () => {
    const data = makeAdmin()
    await adminFactory.execute(data)

    const deliverman = makeDeliveryman({ documentNumber : DocumentNumber.create('98765432100')})
    await deliverymanFactory.execute(deliverman)

    const recipient = makeRecipient({ documentNumber : DocumentNumber.create('12365498700')})
    await recipientFactory.execute(recipient)

    const packageOrder = makePackage({ deliveryManId: deliverman.id, recipientId: recipient.id , status : Status.create({ changedAt : new Date(), status : 'delivered'}) })
    await packageFactory.execute(packageOrder)

    const accessToken = jwt.sign({ sub: data.id.toString() })

    const response = await request(app.getHttpServer())
      .put(`/package/${packageOrder.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        recipientId: recipient.id.toString(),
        delivermanId: deliverman.id.toString(),
        latitude: 200,
        longitude: 200,
      })

    const packageAtDatabase = await prisma.package.findMany()

    expect(response.status).toEqual(204)

    expect(packageAtDatabase[0].latitude).toEqual(200)
    expect(packageAtDatabase[0].longitude).toEqual(200)
  })
})