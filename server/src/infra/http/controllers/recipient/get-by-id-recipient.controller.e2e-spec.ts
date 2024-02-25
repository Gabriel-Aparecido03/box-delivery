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
import { MakeRecipientE2E } from "test/e2e-factories/make-recipient.e2";

describe('Get by id recipient - E2E', () => {

  let app: INestApplication;
  let adminFactory: MakeAdminE2E
  let recipientFactory : MakeRecipientE2E
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MakeAdminE2E,MakeRecipientE2E]
    }).compile()
    app = moduleRef.createNestApplication();
    adminFactory = moduleRef.get(MakeAdminE2E)
    recipientFactory = moduleRef.get(MakeRecipientE2E)
    jwt = moduleRef.get(JwtService)
    await app.init();
  });

  test('[GET] /recipient/:id', async () => {
    const data = makeAdmin()
    await adminFactory.execute(data)

    const recipient = makeRecipient({ documentNumber : DocumentNumber.create('19823719823')})
    await recipientFactory.execute(recipient)

    const accessToken = jwt.sign({ sub: data.id.toString() })

    const response = await request(app.getHttpServer())
      .get(`/recipient/${recipient.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toEqual(200)
    expect(response.body._id.value).toEqual(recipient.id.toString())
  })
})