import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavLinkPropsType {
  icon: ReactNode,
  content: string,
  to: string,
  isSelected?: boolean
}

export function NavLink({ content, icon, to, isSelected }: NavLinkPropsType) {
  return (
    <Link to={to} className={`hover:bg-zinc-200/40 cursor-pointer transition-all duration-200 flex items-center gap-3 justify-start rounded-lg p-2 ${isSelected && 'bg-zinc-200/40'}`}>
      {icon}
      <p className="text-sm font-regular text-zinc-600">{content}</p>
    </Link>
  )
}
