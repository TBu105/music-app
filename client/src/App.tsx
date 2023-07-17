import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { getCurrentUser } from "./features/auth/authSlice"
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
import TrackPage from "./pages/TrackPage"

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
          <Route path="/track/:id" element={<TrackPage />} />
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
