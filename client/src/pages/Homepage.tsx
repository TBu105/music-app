import HistoryNavigation from "../components/Buttons/HistoryNavigation"
import Primary from "../components/Buttons/Primary"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

const Homepage = () => {
  const navigate = useNavigate()
  const username = useAppSelector((state) => state.auth.user?.username)

  return (
    <main className="flex-grow text-linkwater pt-9 px-9 overflow-y-scroll">
      <div className="flex justify-between sticky top-0">
        <HistoryNavigation />
        {username ? (
          <Primary onClick={() => {}}>{username}</Primary>
        ) : (
          <Primary onClick={() => navigate("/account/login")}>
            Đăng nhập
          </Primary>
        )}
      </div>

      <div className="h-[10000px]"></div>
    </main>
  )
}

export default Homepage
