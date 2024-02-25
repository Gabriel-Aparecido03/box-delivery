import { Injectable } from "@nestjs/common";
import { Admin } from "../../enterprise/entities/admin";
import { Encrypter } from "../cryptography/encrypter";
import { HashComparer } from "../cryptography/hash-comparer";
import { AdminRepository } from "../repositories/admin-repository";
import { InvalidCredentials } from "./errors/invalid-credentials";

interface AuthenticateAdminUseCasePropsType {
  documentNumber: string
  password: string
}

@Injectable()
export class AuthenticateAdminUseCase {
  constructor(private adminRepository: AdminRepository, private hashComparer: HashComparer, private encrypter: Encrypter) { }

  async execute({ documentNumber, password }: AuthenticateAdminUseCasePropsType) {
    const admin = await this.adminRepository.getByDocumentNumber(documentNumber)
    if (!admin) throw new InvalidCredentials()
    const isPasswordMatch = await this.hashComparer.comparer(password, admin.password)
    if (!isPasswordMatch) throw new InvalidCredentials()

    const accessToken = await this.encrypter.encrypt({ sub: admin.id.toString() , role : 'ADMIN' })

    return { access_token: accessToken }
  }
} 