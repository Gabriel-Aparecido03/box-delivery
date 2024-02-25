import dayjs from "../../lib/dayjs";
import { TableRow, TableCell } from "../ui/table"
import { ChangePasswordDeliveryman } from "./change-password-deliveryman"
import { DeleteDeliveryman } from "./delete-deliveryman"
import { EditDeliveryman } from "./edit-deliveryman"

interface DeliverymanTableRowPropsType {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  documentNumber: string
}

export function DeliverymanTableRow({ createdAt, documentNumber, id, name, updatedAt }: DeliverymanTableRowPropsType) {
  return (
    <TableRow key={id}>
      <TableCell>{documentNumber}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{dayjs().from(new Date(createdAt))}</TableCell>
      <TableCell>{updatedAt ? dayjs().from(new Date(updatedAt)) : 'Not updated'}</TableCell>
      <TableCell className="flex justify-center items-center gap-3">
        <EditDeliveryman id={id} />
        <DeleteDeliveryman id={id} />
      </TableCell>
      <TableCell>
        <ChangePasswordDeliveryman id={id}/>
      </TableCell>
    </TableRow>
  )
}