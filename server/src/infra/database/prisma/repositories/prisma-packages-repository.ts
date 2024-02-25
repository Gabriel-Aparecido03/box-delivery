import { Injectable } from "@nestjs/common";
import { PackageRepository, fetchPackagesNear } from "src/domain/delivery/application/repositories/packages-repository";
import { Package } from "src/domain/delivery/enterprise/entities/package";
import { PrismaPackageMapper } from "../mapper/package-prisma-mapper";
import { PrismaService } from "../prisma.service";
import { DomainEvents } from "src/domain/core/events/domain-events";
import { Coordinate } from "src/domain/delivery/enterprise/entities/value-object/coordinate";
import { PackageWithDetails } from "src/domain/delivery/enterprise/entities/value-object/package-wtih-details";
import { PrismaPackageWithDetailsMapper } from "../mapper/package-with-details";

@Injectable()
export class PrismaPackagesRepository implements PackageRepository {

  constructor(private prismaService: PrismaService) { }

  async create(packageOrder: Package): Promise<void> {
    const data = new PrismaPackageMapper().toPrisma(packageOrder)
    await this.prismaService.package.create({ data })
  }

  async getByID(id: string): Promise<PackageWithDetails> {
    const result = await this.prismaService.package.findUnique({
      where: { id },
      include: {
        deliveryman: true,
        recipientID: true
      }
    })
    return new PrismaPackageWithDetailsMapper().toDomain(result)
  }

  async update(packageOrder: Package): Promise<void> {
    const data = new PrismaPackageMapper().toPrisma(packageOrder)
    await this.prismaService.package.update({
      where: { id: data.id },
      data
    })
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.package.delete({
      where: { id }
    })
  }

  async changeStatusToDelivered(packageOrder: Package): Promise<void> {
    const data = new PrismaPackageMapper().toPrisma(packageOrder)
    await this.prismaService.package.update({
      where: { id: data.id },
      data: {
        status: 'DELIVERED'
      }
    })

    DomainEvents.dispatchEventsForAggregate(packageOrder.id)
  }

  async changeStatusToPickUp(packageOrder: Package): Promise<void> {
    const data = new PrismaPackageMapper().toPrisma(packageOrder)
    await this.prismaService.package.update({
      where: { id: data.id },
      data: {
        status: 'PICK_UP'
      }
    })

    DomainEvents.dispatchEventsForAggregate(packageOrder.id)
  }

  async changeStatusReturned(packageOrder: Package): Promise<void> {
    const data = new PrismaPackageMapper().toPrisma(packageOrder)
    await this.prismaService.package.update({
      where: { id: data.id },
      data: {
        status: 'RETURNED'
      }
    })

    DomainEvents.dispatchEventsForAggregate(packageOrder.id)
  }

  async fetchPackagesNear({ coordinates, deliverymanId }: fetchPackagesNear): Promise<PackageWithDetails[]> {
    const result = await this.prismaService.package.findMany({
      where: {
        deliverymanId
      },
      include: {
        deliveryman: true,
        recipientID: true
      }
    })

    const coordinate = Coordinate.create({ latitude: coordinates.latitude, longitude: coordinates.longitude })
    const filter = result.filter(i => coordinate.getDistanceBetweenCoordinates({ latitude: i.latitude, longitude: i.longitude }) < 1000)
    return result.map(i => new PrismaPackageWithDetailsMapper().toDomain(i))
  }

  async fetchAllPackagesOfDeliveryman(deliverymanId: string): Promise<PackageWithDetails[]> {
    const result = await this.prismaService.package.findMany({
      where: {
        deliverymanId
      },
      include: {
        deliveryman: true,
        recipientID: true
      }
    })

    return result.map(i => new PrismaPackageWithDetailsMapper().toDomain(i))
  }

  async fetchAllPackagesOfRecipient(recipientId: string): Promise<PackageWithDetails[]> {
    const result = await this.prismaService.package.findMany({
      where: {
        recipientId
      },
      include: {
        deliveryman: true,
        recipientID: true
      }
    })

    return result.map(i => new PrismaPackageWithDetailsMapper().toDomain(i))
  }

  async fetchAllPackages(): Promise<PackageWithDetails[]> {
    const result = await this.prismaService.package.findMany({
      include: {
        deliveryman: true,
        recipientID: true
      }
    })
    return result.map(i => new PrismaPackageWithDetailsMapper().toDomain(i))
  }

}