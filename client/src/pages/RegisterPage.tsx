import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import BrandLogo from "../assets/brand-light.svg"
import { registerAsync } from "../features/auth/authSlice"

const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const errMessage = useAppSelector((state) => state.auth.error)

  const currentDate = new Date()
  let getCurrentYear = currentDate.getFullYear()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [month, setMonth] = useState("")
  const [date, setDate] = useState("")
  const [year, setYear] = useState("")
  const [gender, setGender] = useState("")

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value)
  }
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value.replace(/\D/g, ""))
  }
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value.replace(/\D/g, ""))
  }
  const handleGenderOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value)
  }
  const handleSubmitRegister = () => {
    try {
      dispatch(
        registerAsync(
          email,
          username,
          `${year}-${month}-${date}`,
          password,
          gender,
        ),
      )
    } catch (error) {}
  }

  return (
    <div className="bg-neutral-100 w-full h-screen">
      <img src={BrandLogo} alt="brand" className="mx-auto py-12" />
      <div className="flex flex-col max-w-xs mx-auto">
        {errMessage && (
          <div className="bg-red-500 text-linkwater p-3 mb-5 rounded-lg">
            {errMessage}
          </div>
        )}
        {/* Email */}
        <label className="font-semibold">What's your email?</label>
        <input
          type="email"
          className="bg-white p-3 rounded-md border border-gray-200 mb-4"
          placeholder="What's your email"
          value={email}
          onChange={handleEmailChange}
        />
        {/* Password */}
        <label className="font-semibold">Type your password</label>
        <input
          type="text"
          className="bg-white p-3 rounded-md border border-gray-200 mb-4"
          placeholder="Type your password"
          value={password}
          onChange={handlePasswordChange}
        />
        {/* Username */}
        <label className="font-semibold">What should we call you?</label>
        <input
          type="text"
          className="bg-white p-3 rounded-md border border-gray-200 mb-4"
          placeholder="What should we call you?"
          value={username}
          onChange={handleUsernameChange}
        />
        {/* Birthdate */}
        <label className="font-semibold">Date of birth?</label>
        <div className="flex gap-2 mb-4">
          <div className="flex flex-col flex-grow">
            <label>Month</label>
            <select
              className="bg-white px-3 h-[50px] rounded-md border border-gray-200"
              onChange={handleMonthChange}
            >
              <option selected disabled>
                Month
              </option>
              <option value={1}>January</option>
              <option value={2}>Febuary</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
          </div>
          <div className="flex flex-col w-1/5">
            <label>Date</label>
            <input
              maxLength={2}
              type="text"
              className="bg-white p-3 rounded-md border border-gray-200"
              placeholder="DD"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label>Year</label>
            <input
              maxLength={4}
              type="text"
              className="bg-white p-3 rounded-md border border-gray-200"
              placeholder="YYYY"
              value={year}
              onChange={handleYearChange}
            />
          </div>
        </div>
        {/* Seggs? */}
        <label className="font-semibold">Gender?</label>
        <div className="flex gap-2 mb-4">
          <label>
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={handleGenderOptionChange}
            />
            <span className="px-2">Male</span>
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={handleGenderOptionChange}
            />
            <span className="px-2">Female</span>
          </label>
          <label>
            <input
              type="radio"
              value="others"
              checked={gender === "others"}
              onChange={handleGenderOptionChange}
            />
            <span className="px-2">Others</span>
          </label>
        </div>
        {/* Submit Button */}
        <button
          className="p-4 bg-jarcata-500 rounded-full w-1/2 mx-auto font-semibold text-linkwater"
          onClick={handleSubmitRegister}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default RegisterPage
