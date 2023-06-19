import React from "react"
import BrandLogo from "../assets/brand.svg"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-t from-ebony from-20% to-tundora overflow-hidden">
      <header className="bg-dark w-full h-fit p-4">
        <img src={BrandLogo} alt="brand" />
      </header>
      <Outlet />
    </div>
  )
}

export default UserLayout
