import { INestApplication } from "@nestjs/common";
import { hash } from "bcryptjs"
import { AppModule } from "src/infra/app.module";
import { MakeDeliverymanE2E } from "test/e2e-factories/make-deliveryman.e2e";
import { Test } from '@nestjs/testing';
import { DatabaseModule } from "src/infra/database/database.module";
import { makeDeliveryman } from "test/factories/make-deliveryman";
import { DocumentNumber } from "src/domain/delivery/enterprise/entities/value-object/document-number";
import request from 'supertest';

describe('Authtenticate deliveryman - E2E',()=>{

  let app: INestApplication;
  let deliverymanFactory : MakeDeliverymanE2E

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports : [AppModule,DatabaseModule],
      providers : [MakeDeliverymanE2E]
    }).compile()
    app = moduleRef.createNestApplication();
    deliverymanFactory = moduleRef.get(MakeDeliverymanE2E)
    await app.init();
  });
  
  test('[POST] /session/deliveryman/authenticate',async () =>{
    const data = makeDeliveryman({
      documentNumber : DocumentNumber.create('44427906044'),
      password :  await hash('password',8)
    })
    await deliverymanFactory.execute(data)

    const response = await request(app.getHttpServer()).post('/session/deliveryman/authenticate').send({
      documentNumber : '44427906044',
      password : 'password'
    })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      access_token : expect.any(String)
    })
  })
})