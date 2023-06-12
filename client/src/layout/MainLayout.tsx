import React from "react"
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-t from-dark from-80% to-martinique flex">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default MainLayout
