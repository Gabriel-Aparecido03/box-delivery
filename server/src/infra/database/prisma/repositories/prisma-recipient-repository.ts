import { Injectable } from "@nestjs/common"
import { RecipientRepository } from "src/domain/delivery/application/repositories/recipient-repository"
import { Recipient } from "src/domain/delivery/enterprise/entities/recipient"
import { PrismaRecipientMapper } from "../mapper/recipient-prisma-mapper"
import { PrismaService } from "../prisma.service"

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {

  constructor(private prismaService: PrismaService) { }

  async create(recipient: Recipient): Promise<void> {
    const data = new PrismaRecipientMapper().toPrisma(recipient)
    await this.prismaService.user.create({ data })
  }

  async update(recipient: Recipient): Promise<void> {
    const data = new PrismaRecipientMapper().toPrisma(recipient)

    await this.prismaService.user.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id
      }
    })
  }

  async getByDocumentNumber(documentNumber: string): Promise<Recipient> {
    const result = await this.prismaService.user.findUnique({
      where: {
        documentNumber
      }
    })

    return new PrismaRecipientMapper().toDomain(result)
  }

  async getById(id: string): Promise<Recipient> {
    const result = await this.prismaService.user.findUnique({
      where: {
        id
      }
    })

    return new PrismaRecipientMapper().toDomain(result)
  }


  async fetchAllRecipients(): Promise<Recipient[]> {

    const result = await this.prismaService.user.findMany({
      where: {
        role: 'RECIPIENT'
      }
    })

    return result.map(i => new PrismaRecipientMapper().toDomain(i))
  }

}