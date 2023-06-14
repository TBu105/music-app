import React from "react"
import HistoryNavigation from "../components/Buttons/HistoryNavigation"
import Primary from "../components/Buttons/Primary"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/auth/authSlice"

const Homepage = () => {
  const auth = useAppSelector(selectAuth)
  return (
    <main className="flex-grow text-linkwater pt-9 px-9 overflow-y-scroll">
      <div className="flex justify-between sticky top-0">
        <HistoryNavigation />
        <Primary onClick={() => {}}>Đăng nhập</Primary>
      </div>

      <div className="h-[10000px]">{auth.currentUser?.email}</div>
    </main>
  )
}

export default Homepage
