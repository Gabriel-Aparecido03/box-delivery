import { Injectable } from "@nestjs/common";
import { Deliveryman } from "src/domain/delivery/enterprise/entities/deliveryman";
import { PrismaDeliverymanMapper } from "src/infra/database/prisma/mapper/deliveryman-prisma-mapper";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

@Injectable()
export class MakeDeliverymanE2E{
  constructor(private prismaService : PrismaService) {}

  async execute(data: Deliveryman) {
    await this.prismaService.user.create({
      data : new PrismaDeliverymanMapper().toPrisma(data)
    })
  }
}