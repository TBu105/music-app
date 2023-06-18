import HistoryNavigation from "../components/Buttons/HistoryNavigation"
import Primary from "../components/Buttons/Primary"
import { useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router-dom"
import ProfileDropdown from "../components/Profile/ProfileDropdown"

const Homepage = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser?.id)
  return <div>{currentUser}</div>
}

export default Homepage
