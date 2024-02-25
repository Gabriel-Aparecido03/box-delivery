import { Module } from "@nestjs/common";
import { BcryptHasher } from "./bcrypt";
import { JwtEncrypter } from "./jwt-encrypter";
import { Encrypter } from "src/domain/delivery/application/cryptography/encrypter";
import { HashComparer } from "src/domain/delivery/application/cryptography/hash-comparer";
import { HashGenerator } from "src/domain/delivery/application/cryptography/hash-generator";

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule{}