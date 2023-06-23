import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Link, useNavigate } from "react-router-dom"
import { updateUserById } from "../features/user/userSlice"

const EditProfile = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user.userData)
  const [newEmail, setNewEmail] = useState("")
  const [newGender, setNewGender] = useState("")
  const [month, setMonth] = useState("")
  const [date, setDate] = useState("")
  const [year, setYear] = useState("")

  useEffect(() => {
    if (user) {
      setNewEmail(user.email)
      setNewGender(user.gender)
      const dateOfBirth = new Date(user.birthday)
      setMonth((dateOfBirth.getMonth() + 1).toString())
      setDate(dateOfBirth.getDate().toString())
      setYear(dateOfBirth.getFullYear().toString())
    }
  }, [user])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value)
  }
  const handleGenderOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setNewGender(e.target.value)
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
  const handleUpdateProfile = () => {
    if (user) {
      dispatch(
        updateUserById(user.id, {
          email: newEmail,
          gender: newGender,
          birthday: `${month}-${date}-${year}`,
        }),
      )
      navigate("../overview")
    }
  }

  return (
    <>
      <h1 className="text-4xl font-medium">Edit profile</h1>
      <div className="flex flex-col my-4">
        <label htmlFor="editEmail">Email</label>
        <input
          type="email"
          name="editEmail"
          id="editEmail"
          className="bg-transparent border border-black rounded-md px-4 py-3"
          value={newEmail}
          onChange={handleEmailChange}
        />
        <Link to="../change-password" className="hover:underline my-2">
          Change password
        </Link>
        <label>Gender</label>
        <select
          name="editGender"
          id="editGender"
          className="bg-transparent h-[50px] px-2 border border-black rounded-md mb-4"
          value={newGender}
          onChange={handleGenderOptionChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
        <label>Date of birth</label>
        <div className="flex gap-2">
          <select
            className="bg-transparent px-2 h-[50px] border border-black rounded-md basis-3/4"
            onChange={handleMonthChange}
            value={month}
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
          <input
            maxLength={2}
            type="text"
            className="bg-transparent border border-black rounded-md px-4 py-3 basis-1/4"
            placeholder="DD"
            value={date}
            onChange={handleDateChange}
          />
          <input
            maxLength={4}
            type="text"
            className="bg-transparent border border-black rounded-md px-4 py-3 flex-shrink"
            placeholder="YYYY"
            value={year}
            onChange={handleYearChange}
          />
        </div>
        <div className="flex w-full justify-end items-center my-4 gap-4">
          <Link
            to="../overview"
            className="font-semibold text-neutral-600 hover:text-black"
          >
            Cancel
          </Link>
          <button
            className="p-2 bg-jarcata-500 rounded-full w-24 font-semibold text-linkwater"
            onClick={handleUpdateProfile}
          >
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default EditProfile
