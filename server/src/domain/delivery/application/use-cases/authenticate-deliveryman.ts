import { Injectable } from "@nestjs/common";
import { Encrypter } from "../cryptography/encrypter";
import { HashComparer } from "../cryptography/hash-comparer";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { InvalidCredentials } from "./errors/invalid-credentials";

interface AuthenticateDeliverymanUseCasePropsType {
  documentNumber: string
  password: string
}

@Injectable()
export class AuthenticateDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository, private hashComparer: HashComparer, private encrypter: Encrypter) { }

  async execute({ documentNumber, password }: AuthenticateDeliverymanUseCasePropsType) {
    const deliveryman = await this.deliverymanRepository.getByDocumentNumber(documentNumber)
    if (!deliveryman) throw new InvalidCredentials()

    const isPasswordMatch = await this.hashComparer.comparer(password, deliveryman.password)
    if (!isPasswordMatch) throw new InvalidCredentials()

    const accessToken = await this.encrypter.encrypt({ sub: deliveryman.id.toString() , role : 'DELIVERYMAN' })

    return { access_token: accessToken }

  }
} 