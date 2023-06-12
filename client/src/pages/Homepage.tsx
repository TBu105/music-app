import React from "react"
import HistoryNavigation from "../components/Buttons/HistoryNavigation"
import Primary from "../components/Buttons/Primary"

const Homepage = () => {
  return (
    <main className="flex-grow text-linkwater pt-9 px-9 overflow-y-scroll">
      <div className="flex justify-between sticky top-0">
        <HistoryNavigation />
        <Primary onClick={() => {}}>Đăng nhập</Primary>
      </div>

      <div className="h-[10000px]"></div>
    </main>
  )
}

export default Homepage
