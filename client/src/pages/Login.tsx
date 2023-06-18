import React, { useState, useRef, useEffect } from "react"
import { loginAsync } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loginError = useAppSelector((state) => state.auth.error)

  const userRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [errMessage, setErrMessage] = useState("")

  useEffect(() => {
    userRef.current?.focus()
  }, [])

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value)
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(loginAsync(user, password))
      setUser("")
      setPassword("")
      navigate("/")
    } catch (error: any) {
      setErrMessage(error.message)
    }
  }

  return (
    <div className="mx-auto w-1/3 bg-dark h-screen mt-10 rounded-xl text-linkwater pt-12 box-border">
      <h1 className="text-center font-bold text-4xl">Login to Unicord</h1>
      <form className="mx-auto p-5 w-1/2" onSubmit={handleSubmit}>
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
          className="w-full bg-jarcata my-5 py-3 rounded-full"
        />
      </form>
    </div>
  )
}

export default Login
