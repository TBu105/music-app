import React from "react"
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-t from-neutral-950 from-70% to-martinique to-120% flex">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default MainLayout
