import React from "react"
import Sidebar from "../components/Sidebar"
import { Outlet, useNavigate } from "react-router-dom"
import HistoryNavigation from "../components/Buttons/HistoryNavigation"
import Primary from "../components/Buttons/Primary"
import ProfileDropdown from "../components/Profile/ProfileDropdown"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { logoutAsync } from "../features/auth/authSlice"

const MainLayout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  const handleLogOut = () => {
    dispatch(logoutAsync())
    navigate("/")
  }

  return (
    <div className="w-full h-screen bg-gradient-to-t from-neutral-950 from-70% to-martinique to-120% flex">
      <Sidebar />
      <main className="flex-grow text-linkwater overflow-y-scroll relative">
        <div className="sticky top-0 z-10">
          <div className="absolute top-10 inset-x-10 flex justify-between">
            <HistoryNavigation />
            {isLoggedIn === "loading" && ""}
            {isLoggedIn === "false" && (
              <Primary onClick={() => navigate("/account/login")}>
                <span className="px-4">Đăng nhập</span>
              </Primary>
            )}
            {isLoggedIn === "true" && <ProfileDropdown logOut={handleLogOut} />}
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
