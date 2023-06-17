import React, { RefObject, useEffect, useRef, useState } from "react"
import { BsBoxArrowUpRight, BsChevronDown, BsPerson } from "react-icons/bs"
import { Link } from "react-router-dom"
import Primary from "../Buttons/Primary"
import { User } from "../../features/auth/types"

type Props = {
  user: User | null
  logOut: () => void
}

const ProfileDropdown = ({ user, logOut }: Props) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileRef: RefObject<HTMLDivElement> = useRef(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setShowProfileMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  return (
    <div ref={profileRef} className="h-8">
      <Primary onClick={() => setShowProfileMenu(!showProfileMenu)}>
        <div className="flex items-center p-1 gap-1 h-full">
          {user?.image === "" ? (
            <div className="bg-neutral-700 rounded-full p-1">
              <BsPerson size={16} />
            </div>
          ) : (
            <img
              src={user?.image}
              alt="avatar"
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <BsChevronDown />
        </div>
      </Primary>
      {showProfileMenu ? (
        <div className="bg-neutral-800 absolute top-10 right-0 w-36 rounded-md p-1 flex flex-col text-xs font-semibold">
          <Link
            to={"/"}
            target="_blank"
            className="flex items-center justify-between hover:bg-neutral-600 p-2.5 rounded-sm"
          >
            <span>Account</span>
            <BsBoxArrowUpRight />
          </Link>
          <Link
            to={`/user/${user?.id}`}
            className="hover:bg-neutral-600 p-2.5 rounded-sm"
          >
            <span>Profile</span>
          </Link>
          <Link
            to={"/"}
            className="hover:bg-neutral-600 p-2.5 rounded-sm border-b border-neutral-700"
          >
            <span>Options</span>
          </Link>
          <button
            onClick={logOut}
            className="hover:bg-neutral-600 p-2.5 rounded-sm text-start"
          >
            <span>Log out</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ProfileDropdown
