import { House, Package, UserList } from "phosphor-react"
import { Link } from "react-router-dom"
import { NavLink } from "./nav-link"
import { Logout } from "./logout"

interface HeaderDeliverymanPropsType {
  howIsSelected : string
}

export function HeaderDeliveryman({ howIsSelected }:HeaderDeliverymanPropsType) {

  return (
    <header data-testid="header" className="flex items-center border-b border-zinc-200 justify-between border-solid w-full p-4 px-6">
      <div className="flex items-center justfiy-start gap-8">
        <Link className="flex items-center gap-1" to='/dashboard'>
          <Package size={32} className="text-zinc-800" />
          <span className="text-zinc-800 text-sm font-bold">Box.delivery</span>
        </Link>
        <div className="flex items-center gap-3 jutsify-start">
          <NavLink
            to="/dashboard/deliveryman/my-packages"
            isSelected={howIsSelected === "my-packages"}
            content="My Packages"
            icon={<UserList className="w-6 h-6" />}
          />
          <NavLink
            to="/dashboard/deliveryman/near-of-me"
            content="Near of me"
            icon={<House className="w-6 h-6" />}
            isSelected={howIsSelected === "near-of-me"}
          />
        </div>
      </div>
      <Logout />
    </header>
  )
}