import { Outlet } from "react-router-dom";
import { AddNewPackage } from "../components/packages-control/add-new-packages";
import { TableOfPackages } from "../components/packages-control/table-of-packages";

export function PackagesControl() {
  return (
    <div className="flex-1">
      <AddNewPackage />
      <TableOfPackages />
      <Outlet />
    </div>
  )
}