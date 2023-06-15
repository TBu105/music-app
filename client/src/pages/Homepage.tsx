import HistoryNavigation from "../components/Buttons/HistoryNavigation"
import Primary from "../components/Buttons/Primary"
import { useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router-dom"
import ProfileDropdown from "../components/Profile/ProfileDropdown"

const Homepage = () => {
  const navigate = useNavigate()
  const userExist = useAppSelector((state) => state.auth.currentUser)
  const avatar = useAppSelector((state) => state.auth.user?.image)

  console.log(avatar)

  return (
    <main className="flex-grow text-linkwater pt-9 px-9 overflow-y-scroll">
      <div className="sticky top-0">
        <div className="flex justify-between">
          <HistoryNavigation />
          {userExist ? (
            <ProfileDropdown avatar={avatar} logOut={() => {}} />
          ) : (
            <Primary onClick={() => navigate("/account/login")}>
              <span className="px-4">Đăng nhập</span>
            </Primary>
          )}
        </div>
      </div>
      <div className="h-[10000px]"></div>
    </main>
  )
}

export default Homepage
