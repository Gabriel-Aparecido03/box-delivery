import { Injectable } from "@nestjs/common";
import { Recipient } from "src/domain/delivery/enterprise/entities/recipient";
import { PrismaRecipientMapper } from "src/infra/database/prisma/mapper/recipient-prisma-mapper";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

@Injectable()
export class MakeRecipientE2E{
  constructor(private prismaService : PrismaService) {}

  async execute(data: Recipient) {
    await this.prismaService.user.create({
      data : new PrismaRecipientMapper().toPrisma(data)
    })
  }
}