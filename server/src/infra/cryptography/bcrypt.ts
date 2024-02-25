import { hash, compare } from 'bcryptjs'
import { HashComparer } from 'src/domain/delivery/application/cryptography/hash-comparer'
import { HashGenerator } from 'src/domain/delivery/application/cryptography/hash-generator'

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  async encrypt(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  async comparer(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }

}