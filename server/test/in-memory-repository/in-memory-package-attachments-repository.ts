import { PackagesAttachmentsRepository } from "src/domain/delivery/application/repositories/packages-attachments-repository";
import { PackageAttachment } from "src/domain/delivery/enterprise/entities/package-attachment";

export class InMemoryPackagesAttachmentsRepository implements PackagesAttachmentsRepository {

  items: PackageAttachment[] = []

  async createMany(attachaments: PackageAttachment[]): Promise<void> {
    attachaments.map(i => this.items.push(i))
  }

  async deleteMany(attachaments: PackageAttachment[]): Promise<void> {
    attachaments.map(i => {
      this.items.filter(x => x.attachmentId.toString() !== i.attachmentId.toString())
    })
  }

  async fetchByPackageId(packageId: string): Promise<PackageAttachment[]> {
    const result = this.items.filter(x => x.packageId.toString() === packageId)
    return result
  }

  async deleteManyByPackageId(packageId: string): Promise<void> {
    this.items.filter(x => x.packageId.toString() !== packageId)
  }

}