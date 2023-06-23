import { BsHouseFill, BsPencil, BsPersonCircle } from "react-icons/bs"
import { NavLink } from "react-router-dom"

const AccountSidebar = () => {
  const active =
    "w-11/12 flex items-center gap-2 font-light bg-neutral-500/70 p-4 rounded-r-md border-r-8 border-jarcata-500"
  const disabled =
    "w-11/12 flex items-center gap-2 font-light bg-neutral-500/70 p-4 rounded-r-md"

  return (
    <div className="w-60 bg-neutral-900 text-linkwater h-full">
      <div className="mx-auto w-fit my-6">
        <BsPersonCircle size={64} />
      </div>
      <div className="flex flex-col gap-1">
        <NavLink
          to="overview"
          className={({ isActive }) => (isActive ? active : disabled)}
        >
          <BsHouseFill size={16} />
          Account overview
        </NavLink>
        <NavLink
          to="profile"
          className={({ isActive }) => (isActive ? active : disabled)}
        >
          <BsPencil size={16} />
          Edit profile
        </NavLink>
      </div>
    </div>
  )
}

export default AccountSidebar
