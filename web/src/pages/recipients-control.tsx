import { Outlet } from "react-router-dom";
import { TableOfRecipients } from "../components/recipients-control/table-of-recipients";
import { AddNewRecipient } from "../components/recipients-control/add-new-recipients";

export function RecipientsControl() {
  return (
    <div className="flex-1">
      <AddNewRecipient />
      <TableOfRecipients />
      <Outlet />
    </div>
  )
}