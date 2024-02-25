import { INestApplication } from "@nestjs/common";
import { hash } from "bcryptjs"
import { AppModule } from "src/infra/app.module";
import { MakeAdminE2E } from "test/e2e-factories/make-admin.e2e";
import { Test } from '@nestjs/testing';
import { DatabaseModule } from "src/infra/database/database.module";
import { makeAdmin } from "test/factories/make-admin";
import { DocumentNumber } from "src/domain/delivery/enterprise/entities/value-object/document-number";
import request from 'supertest';
import { JwtService } from "@nestjs/jwt";
import { Coordinate } from "src/domain/delivery/enterprise/entities/value-object/coordinate";

describe('Register deliveryman - E2E', () => {

  let app: INestApplication;
  let adminFactory: MakeAdminE2E
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MakeAdminE2E]
    }).compile()
    app = moduleRef.createNestApplication();
    adminFactory = moduleRef.get(MakeAdminE2E)
    jwt = moduleRef.get(JwtService)
    await app.init();
  });

  test('[POST] /session/deliveryman/register', async () => {
    const data = makeAdmin({
      documentNumber: DocumentNumber.create('123123123'),
      password: await hash('password', 8),
      coordinate: Coordinate.create({ latitude: 0, longitude: 0 })
    })
    await adminFactory.execute(data)
    const accessToken = jwt.sign({ sub: data.id.toString() })
    const response = await request(app.getHttpServer())
      .post('/session/deliveryman/register')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        documentNumber: '44427906044',
        password: 'password',
        latitude: 0,
        longitude: 0,
        name: 'lorem-lorem'
      })

    expect(response.status).toEqual(201)
  })
})