import { useEffect } from "react"
import { useAppDispatch } from "./app/hooks"
import { getCurrentUserAsync } from "./features/auth/authSlice"
import { AudioPlayer } from "./components/Player/AudioPlayer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//layout imports
import MainLayout from "./layout/MainLayout"
import UserLayout from "./layout/UserLayout"

//page imports
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"

const audio = {
  url: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
  title: "A sample audio title",
  author: "The Elephants Dream",
  thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
}
const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCurrentUserAsync())
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/user/:id" element={<ProfilePage />} />
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
