import { HashGenerator } from "src/domain/delivery/application/cryptography/hash-generator";

export class InTextHashGenerator implements HashGenerator {
  async encrypt(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
}