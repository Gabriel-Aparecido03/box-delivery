import { Outlet } from "react-router-dom";
import { AddNewDeliveryman } from "../components/deliveryman-control/add-new-deliveryman";
import { TableOfDeliverymans } from "../components/deliveryman-control/table-of-deliverymans";

export function DeliverymansControl() {
  return (
    <div className="flex-1">
      <AddNewDeliveryman />
      <TableOfDeliverymans />
      <Outlet />
    </div>
  )
}