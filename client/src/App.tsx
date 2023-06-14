import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { getCurrentUserAsync, getProfile } from "./features/auth/authSlice"
import { AudioPlayer } from "./components/Player/AudioPlayer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BsLayoutSidebar } from "react-icons/bs"

//layout imports
import MainLayout from "./layout/MainLayout"
import UserLayout from "./layout/UserLayout"

//page imports
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import RegisterPage from "./pages/RegisterPage"

const audio = {
  url: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
  title: "A sample audio title",
  author: "The Elephants Dream",
  thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
}
const App = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.currentUser)

  useEffect(() => {
    dispatch(getCurrentUserAsync())
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
        </Route>
        <Route path="/account" element={<UserLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
