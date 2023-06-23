import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { getCurrentUser } from "./features/auth/authSlice"
import { AudioPlayer } from "./components/Player/AudioPlayer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//layout imports
import MainLayout from "./layout/MainLayout"
import UserLayout from "./layout/UserLayout"
import AccountLayout from "./layout/AccountLayout"

//page imports
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import AccountOverview from "./pages/AccountOverview"
import EditProfile from "./pages/EditProfile"
import ChangePassword from "./pages/ChangePassword"

const audio = {
  url: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
  title: "A sample audio title",
  author: "The Elephants Dream",
  thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
}
const App = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn === "loading") {
      dispatch(getCurrentUser())
    }
  }, [isLoggedIn])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/user/:id" element={<ProfilePage />} />
        </Route>
        <Route path="/account" element={<UserLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<AccountLayout />}>
            <Route index path="overview" element={<AccountOverview />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
