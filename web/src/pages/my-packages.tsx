import { Outlet } from "react-router-dom";
import { TableOfMyPackages } from "../components/my-packages/table-of-my-packages";

export function MyPackages() {
  return (
    <div className="flex-1">
      <TableOfMyPackages />
      <Outlet />
    </div>
  )
}