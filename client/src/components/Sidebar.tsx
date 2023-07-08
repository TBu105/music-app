import React from "react"
import BrandLogo from "../assets/brand.svg"
import { BsFiles, BsFillHouseDoorFill, BsSearch } from "react-icons/bs"
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="sticky top-0 w-fit bg-black h-screen p-2 text-linkwater">
      <Link to="/">
        <img src={BrandLogo} alt="brand" />
      </Link>
      <div className="flex flex-col gap-6 text-2xl my-6 px-2 font-bold">
        <div className="flex items-center gap-4">
          <BsFillHouseDoorFill size={32} />
          <Link to="/">Home</Link>
        </div>
        <div className="flex items-center gap-4">
          <BsSearch size={32} />
          <Link to="/">Search</Link>
        </div>
        <div className="w-full h-0.5 bg-linkwater/10 rounded-lg"></div>
        <div className="flex items-center gap-4">
          <BsFiles size={32} />
          <Link to="/">Your Library</Link>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
