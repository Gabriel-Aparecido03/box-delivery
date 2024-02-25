import { INestApplication } from "@nestjs/common";
import { AppModule } from "src/infra/app.module";
import { MakeAdminE2E } from "test/e2e-factories/make-admin.e2e";
import { Test } from '@nestjs/testing';
import { DatabaseModule } from "src/infra/database/database.module";
import { makeAdmin } from "test/factories/make-admin";
import request from 'supertest';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { MakeRecipientE2E } from "test/e2e-factories/make-recipient.e2";

describe('Create Recipient - E2E', () => {

  let app: INestApplication;
  let adminFactory: MakeAdminE2E
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MakeAdminE2E,MakeRecipientE2E]
    }).compile()
    app = moduleRef.createNestApplication();
    adminFactory = moduleRef.get(MakeAdminE2E)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)
    await app.init();
  });

  test('[POST] /recipient', async () => {
    const data = makeAdmin()
    await adminFactory.execute(data)

    const accessToken = jwt.sign({ sub: data.id.toString() })

    const response = await request(app.getHttpServer())
      .post(`/recipient`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        documentNumber: '44427906044',
        password: 'password',
        latitude: 0,
        longitude: 0,
        name: 'lorem-lorem'
      })

    const recipientAtDatabase = await prisma.user.findMany({ where : { role : 'RECIPIENT' }})

    expect(response.status).toEqual(201)
    expect(recipientAtDatabase).toHaveLength(1)
  })
})