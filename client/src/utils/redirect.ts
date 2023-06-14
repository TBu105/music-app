import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"

export const redirectIfUser = () => {
  const navigate = useNavigate()
  if (useAppSelector((state) => state.auth.currentUser)) {
    navigate("/")
  }
}
