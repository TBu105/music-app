import React from "react"
import BrandLogo from "../assets/brand.svg"
import { BsFillHouseDoorFill, BsSearch } from "react-icons/bs"

const Sidebar = () => {
  return (
    <aside className="sticky top-0 w-fit bg-ebony h-screen p-2">
      <img src={BrandLogo} alt="brand" />
      <div className="flex flex-col gap-6 text-linkwater text-2xl my-6 font-bold">
        <div className="flex items-center gap-4">
          <BsFillHouseDoorFill size={32} />
          <span>Trang chủ</span>
        </div>
        <div className="flex items-center gap-4">
          <BsSearch size={32} />
          <span>Tìm kiếm</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
