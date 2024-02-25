import { Injectable } from "@nestjs/common";
import { Admin } from "src/domain/delivery/enterprise/entities/admin";
import { PrismaAdminMapper } from "src/infra/database/prisma/mapper/admin-prisma-mapper";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

@Injectable()
export class MakeAdminE2E{
  constructor(private prismaService : PrismaService) {}

  async execute(data: Admin) {
    await this.prismaService.user.create({
      data : new PrismaAdminMapper().toPrisma(data)
    })
  }
}