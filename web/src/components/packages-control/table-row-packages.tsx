import dayjs from "../../lib/dayjs";
import { TableRow, TableCell } from "../ui/table";
import { DeletePackage } from "./delete-package";

interface TableOfRowPackagesPropsType {
  id: string
  recipientName: string
  deliverymanName: string
  createdAt: Date
  updatedAt: Date
}

export function TableRowPackages({ createdAt, deliverymanName, id, recipientName, updatedAt }: TableOfRowPackagesPropsType) {
  return (
    <TableRow>
      <TableCell>{deliverymanName}</TableCell>
      <TableCell>{recipientName}</TableCell>
      <TableCell>{dayjs().from(new Date(createdAt))}</TableCell>
      <TableCell>{updatedAt ? dayjs().from(new Date(updatedAt)) : 'Not updated'}</TableCell>
      <TableCell className="flex justify-center items-center gap-3">
        <DeletePackage id={id}/>
      </TableCell>
    </TableRow>
  )
}