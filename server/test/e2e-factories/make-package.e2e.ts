import { Injectable } from "@nestjs/common";
import { Package } from "src/domain/delivery/enterprise/entities/package";
import { PrismaPackageMapper } from "src/infra/database/prisma/mapper/package-prisma-mapper";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

@Injectable()
export class MakePackageE2E {
  constructor(private prismaService: PrismaService) { }

  async execute(data: Package) {
    await this.prismaService.package.create({
      data: new PrismaPackageMapper().toPrisma(data) 
    })
  }
}