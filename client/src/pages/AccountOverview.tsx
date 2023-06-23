import { useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router-dom"

const AccountOverview = () => {
  const user = useAppSelector((state) => state.user.userData)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="text-4xl font-medium">Account overview</h1>
      <h3 className="text-xl font-medium mt-6">Profile</h3>
      {user && (
        <div className="grid grid-cols-2 divide-y divide-black/20 text-neutral-400 font-light mt-2">
          <div className="py-2">Username</div>
          <div className="py-2 border-none text-black font-semibold">
            {user.username}
          </div>
          <div className="py-2">Email</div>
          <div className="py-2 text-black font-semibold">{user.email}</div>
          <div className="py-2">Date of birth</div>
          <div className="py-2 text-black font-semibold">
            {new Date(user.birthday).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="py-2">Gender</div>
          <div className="py-2 text-black font-semibold">
            {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
          </div>
        </div>
      )}
      <button
        className="mt-8 py-2 w-28 rounded-full border-2 border-jarcata-500 text-jarcata-500 font-bold text-sm"
        onClick={() => navigate("../profile")}
      >
        Edit profile
      </button>
    </>
  )
}

export default AccountOverview
