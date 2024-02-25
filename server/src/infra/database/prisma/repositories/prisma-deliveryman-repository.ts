import { DeliverymanRepository } from "src/domain/delivery/application/repositories/deliveryman-repository";
import { Deliveryman } from "src/domain/delivery/enterprise/entities/deliveryman";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaDeliverymanMapper } from "../mapper/deliveryman-prisma-mapper";

@Injectable()
export class PrismaDeliverymanRepository implements DeliverymanRepository {

  constructor(private prismaService: PrismaService) { }

  async fetchAllDeliverymans(): Promise<Deliveryman[]> {
    const data = await this.prismaService.user.findMany({ where : { role : 'DELIVERYMAN' }})
    return data.map( i => new PrismaDeliverymanMapper().toDomain(i))
  }

  async create(deliveryMan: Deliveryman): Promise<void> {
    const data = new PrismaDeliverymanMapper().toPrisma(deliveryMan)
    await this.prismaService.user.create({ data })
  }

  async update(deliveryman: Deliveryman): Promise<void> {
    const data = new PrismaDeliverymanMapper().toPrisma(deliveryman)
    await this.prismaService.user.update({
      where: {
        id: data.id,
        role : 'DELIVERYMAN'
      },
      data
    })
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
        role : 'DELIVERYMAN'
      }
    })
  }

  async getByDocumentNumber(documentNumber: string): Promise<Deliveryman> {
    const result = await this.prismaService.user.findUnique({
      where: {
        documentNumber,
        role : 'DELIVERYMAN'
      }
    })

    return new PrismaDeliverymanMapper().toDomain(result)
  }

  async getByID(id: string): Promise<Deliveryman> {
    const result = await this.prismaService.user.findUnique({
      where: {
        id,
        role : 'DELIVERYMAN'
      }
    })
    if (!result) return null
    return new PrismaDeliverymanMapper().toDomain(result)
  }

}