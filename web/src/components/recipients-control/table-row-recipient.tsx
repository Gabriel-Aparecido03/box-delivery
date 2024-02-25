import dayjs from "../../lib/dayjs";
import { TableRow, TableCell } from "../ui/table"
import { DeleteRecipient } from "./delete-recipients";
import { EditRecipient } from "./edit-recipients";


interface RecipientTableRowPropsType {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  documentNumber: string
}

export function RecipientTableRow({ createdAt, documentNumber, id, name, updatedAt }: RecipientTableRowPropsType) {
  return (
    <TableRow key={id}>
      <TableCell>{documentNumber}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{dayjs().from(new Date(createdAt))}</TableCell>
      <TableCell>{updatedAt ? dayjs().from(new Date(updatedAt)) : 'Not updated'}</TableCell>
      <TableCell className="flex justify-center items-center gap-3">
        <EditRecipient id={id} />
        <DeleteRecipient id={id} />
      </TableCell>
    </TableRow>
  )
}