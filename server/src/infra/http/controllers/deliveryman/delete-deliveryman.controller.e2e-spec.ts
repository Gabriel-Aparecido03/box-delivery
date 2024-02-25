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

describe('Delete deliveryman - E2E', () => {

  let app: INestApplication;
  let adminFactory: MakeAdminE2E
  let deliverymanFactory : MakeDeliverymanE2E
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MakeAdminE2E,MakeDeliverymanE2E]
    }).compile()
    app = moduleRef.createNestApplication();
    adminFactory = moduleRef.get(MakeAdminE2E)
    deliverymanFactory = moduleRef.get(MakeDeliverymanE2E)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)
    await app.init();
  });

  test('[DELETE] /deliveryman/:id', async () => {
    const data = makeAdmin()
    await adminFactory.execute(data)

    const deliverman = makeDeliveryman({ documentNumber : DocumentNumber.create('19823719823')})
    await deliverymanFactory.execute(deliverman)

    const accessToken = jwt.sign({ sub: data.id.toString() })

    const response = await request(app.getHttpServer())
      .delete(`/deliveryman/${deliverman.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)

    const deliverymanAtDatabase = await prisma.user.findMany({ where : { role : 'DELIVERYMAN' }})

    expect(response.status).toEqual(204)
    expect(deliverymanAtDatabase).toHaveLength(0)
  })
})