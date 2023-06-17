import React from "react"
import Sidebar from "../components/Sidebar"
import { Outlet, useNavigate } from "react-router-dom"
import HistoryNavigation from "../components/Buttons/HistoryNavigation"
import Primary from "../components/Buttons/Primary"
import ProfileDropdown from "../components/Profile/ProfileDropdown"
import { useAppSelector } from "../app/hooks"

const MainLayout = () => {
  const navigate = useNavigate()
  const userExist = useAppSelector((state) => state.auth.currentUser)
  const user = useAppSelector((state) => state.auth.user)

  return (
    <div className="w-full h-screen bg-gradient-to-t from-neutral-950 from-70% to-martinique to-120% flex">
      <Sidebar />
      <main className="flex-grow text-linkwater overflow-y-scroll relative">
        <div className="sticky top-0 z-10">
          <div className="absolute top-10 inset-x-10 flex justify-between">
            <HistoryNavigation />
            {userExist ? (
              <ProfileDropdown user={user} logOut={() => {}} />
            ) : (
              <Primary onClick={() => navigate("/account/login")}>
                <span className="px-4">Đăng nhập</span>
              </Primary>
            )}
          </div>
        </div>
        <div className="h-[10000px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
