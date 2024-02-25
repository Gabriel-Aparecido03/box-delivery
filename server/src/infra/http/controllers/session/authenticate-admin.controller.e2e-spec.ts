import { INestApplication } from "@nestjs/common";
import { hash } from "bcryptjs"
import { AppModule } from "src/infra/app.module";
import { MakeAdminE2E } from "test/e2e-factories/make-admin.e2e";
import { Test } from '@nestjs/testing';
import { DatabaseModule } from "src/infra/database/database.module";
import { makeAdmin } from "test/factories/make-admin";
import { DocumentNumber } from "src/domain/delivery/enterprise/entities/value-object/document-number";
import request from 'supertest';

describe('Authtenticate admin - E2E',()=>{

  let app: INestApplication;
  let adminFactory : MakeAdminE2E

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports : [AppModule,DatabaseModule],
      providers : [MakeAdminE2E]
    }).compile()
    app = moduleRef.createNestApplication();
    adminFactory = moduleRef.get(MakeAdminE2E)
    await app.init();
  });
  
  test('[POST] /session/admin/authenticate',async () =>{
    const data = makeAdmin({
      documentNumber : DocumentNumber.create('44427906044'),
      password :  await hash('password',8)
    })
    await adminFactory.execute(data)

    const response = await request(app.getHttpServer()).post('/session/admin/authenticate').send({
      documentNumber : '44427906044',
      password : 'password'
    })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      access_token : expect.any(String)
    })
  })
})