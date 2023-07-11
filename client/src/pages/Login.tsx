import React, { useState, useRef, useEffect } from "react"
import { loginAsync } from "../features/auth/authSlice"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loginError = useAppSelector((state) => state.auth.error)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  const userRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [errMessage, setErrMessage] = useState("")

  useEffect(() => {
    userRef.current?.focus()
  }, [])

  useEffect(() => {
    if (loginError) setErrMessage(loginError)
  }, [loginError])

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value)
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(loginAsync(user, password))
    setUser("")
    setPassword("")
    navigate("/")
  }

  if (isLoggedIn === "true") {
    return <Navigate to="/" />
  }

  return (
    <div className="mx-auto w-1/3 bg-dark h-screen mt-10 rounded-xl text-linkwater pt-12 box-border">
      <h1 className="text-center font-bold text-4xl">Login to Unicord</h1>
      <form className="mx-auto px-5 pt-5 w-1/2" onSubmit={handleSubmit}>
        <label>Email or username</label>
        <input
          type="text"
          ref={userRef}
          className="bg-dark-500 border border-linkwater rounded-md w-full p-2.5 mb-5"
          value={user}
          onChange={handleChangeUser}
        />
        <label>Password</label>
        <input
          type="password"
          className="bg-dark-500 border border-linkwater rounded-md w-full p-2.5"
          value={password}
          onChange={handleChangePassword}
        />
        {errMessage && (
          <div className="bg-red-500 text-linkwater p-3 mt-5 rounded-lg">
            {errMessage}
          </div>
        )}
        <input
          type="submit"
          value="Log In"
          className="w-full bg-jarcata mt-5 py-3 rounded-full"
        />
      </form>
      <div className="w-fit font-semibold text-center my-5 flex flex-col gap-5 mx-auto">
        <Link to={""} className="underline">
          Forgot your password?
        </Link>
        <div className="h-0.5 bg-neutral-800"></div>
        <span>
          Don't have an account?{" "}
          <Link to={"/signup"} className="hover:underline">
            Sign up for Unicord
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Login
