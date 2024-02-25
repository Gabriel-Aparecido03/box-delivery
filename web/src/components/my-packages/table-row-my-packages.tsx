import dayjs from "../../lib/dayjs";
import { TableRow, TableCell } from "../ui/table";
import { ChangePackageStatus } from "./change-package-status";

interface TableOfRowPackagesPropsType {
  id: string
  recipientName: string
  deliverymanName: string
  createdAt: Date
  updatedAt: Date
  status: string
}

export function TableRowMyPackages({ createdAt, deliverymanName, id, recipientName, updatedAt, status }: TableOfRowPackagesPropsType) {
  return (
    <TableRow>
      <TableCell>{deliverymanName}</TableCell>
      <TableCell>{recipientName}</TableCell>
      <TableCell>{dayjs().from(new Date(createdAt))}</TableCell>
      <TableCell>{updatedAt ? dayjs().from(new Date(updatedAt)) : 'Not updated'}</TableCell>
      <TableCell className="flex justify-center items-center gap-3">
        <ChangePackageStatus currentStatus={status} id={id} />
      </TableCell>
    </TableRow>
  )
}