import React from "react"
import { Outlet } from "react-router-dom"
import AccountSidebar from "../components/AccountSidebar"

const AccountLayout = () => {
  return (
    <div className="flex mx-auto w-1/2 bg-linkwater h-screen text-dark box-border">
      <AccountSidebar />
      <div className="flex-grow px-8 py-9">
        <Outlet />
      </div>
    </div>
  )
}

export default AccountLayout
