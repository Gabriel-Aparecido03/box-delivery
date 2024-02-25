import { Injectable } from "@nestjs/common";
import { AdminRepository } from "src/domain/delivery/application/repositories/admin-repository";
import { Admin } from "src/domain/delivery/enterprise/entities/admin";
import { PrismaService } from "../prisma.service";
import { PrismaAdminMapper } from "../mapper/admin-prisma-mapper";

@Injectable()
export class PrismaAdminRepository implements AdminRepository {

  constructor(private prismaService : PrismaService) {}

  async create(admin: Admin): Promise<void> {
    const data = new PrismaAdminMapper().toPrisma(admin)

    await this.prismaService.user.create({ data })
  }

  async update(admin: Admin): Promise<void> {
    const data = new PrismaAdminMapper().toPrisma(admin)
    await this.prismaService.user.update({
      where : {
        id : data.id,
        role : 'ADMIN'
      },
      data
    })
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where : {
        id,
        role : 'ADMIN'
      }
    })
  }

  async getByDocumentNumber(documentNumber: string): Promise<Admin> {
    const result = await this.prismaService.user.findUnique({
      where : {
        documentNumber,
        role : 'ADMIN'
      }
    })
    if( !result ) return null
    return new PrismaAdminMapper().toDomain(result)
  }

  async getByID(id: string): Promise<Admin> {
    const result = await this.prismaService.user.findUnique({
      where : {
        id,
        role : 'ADMIN'
      }
    })
    return new PrismaAdminMapper().toDomain(result)
  }
}