import { INestApplication } from "@nestjs/common";
import { AppModule } from "src/infra/app.module";
import { MakeAdminE2E } from "test/e2e-factories/make-admin.e2e";
import { Test } from '@nestjs/testing';
import { DatabaseModule } from "src/infra/database/database.module";
import { makeAdmin } from "test/factories/make-admin";
import { DocumentNumber } from "src/domain/delivery/enterprise/entities/value-object/document-number";
import request from 'supertest';
import { JwtService } from "@nestjs/jwt";
import { makeRecipient } from "test/factories/make-recipient";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { MakeRecipientE2E } from "test/e2e-factories/make-recipient.e2";

describe('Update recipient - E2E', () => {

  let app: INestApplication;
  let adminFactory: MakeAdminE2E
  let recipientFactory: MakeRecipientE2E
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MakeAdminE2E, MakeRecipientE2E]
    }).compile()
    app = moduleRef.createNestApplication();
    adminFactory = moduleRef.get(MakeAdminE2E)
    recipientFactory = moduleRef.get(MakeRecipientE2E)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)
    await app.init();
  });

  test('[PUT] /recipient', async () => {
    const data = makeAdmin({ documentNumber: DocumentNumber.create('19823719823') })
    await adminFactory.execute(data)

    const recipient = makeRecipient()
    await recipientFactory.execute(recipient)

    const accessToken = jwt.sign({ sub: data.id.toString() })

    const response = await request(app.getHttpServer())
      .put(`/recipient/${recipient.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        documentNumber: '64197183097',
        password: 'password-123',
        latitude: 0,
        longitude: 0, 
      })

    const recipientAtDatabase = await prisma.user.findFirst({ where: { id: recipient.id.toString() } })

    expect(response.status).toEqual(204)
    expect(recipientAtDatabase.documentNumber).toEqual('64197183097')
  })
})