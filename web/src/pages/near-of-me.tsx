import { Outlet } from "react-router-dom";
import { TableOfNearOfMe } from "../components/near-of-me/table-of-near-of-me";

export function NearOfMe() {
  return (
    <div className="flex-1">
      <TableOfNearOfMe />
      <Outlet />
    </div>
  )
}