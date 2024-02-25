import { WatchedList } from "src/domain/core/watched-list";
import { PackageAttachment } from "./package-attachment";

export class PackageAttachmentsList extends WatchedList<PackageAttachment> {
  compareItems(a: PackageAttachment, b: PackageAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}