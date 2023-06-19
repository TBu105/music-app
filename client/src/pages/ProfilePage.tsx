import React, { useState, useRef, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { BsPencil, BsPerson, BsX } from "react-icons/bs"
import { useParams } from "react-router-dom"
import {
  getProfile,
  updateUserByIdAsync,
  uploadUserAvatarAsync,
} from "../features/auth/authSlice"
import ProfileModal from "../components/Profile/ProfileModal"

const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user)
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [onHoverChooseImage, setOnHoverChooseImage] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState(currentUser?.image)
  const [newUsername, setNewUsername] = useState(currentUser?.username)
  const [imageFile, setImageFile] = useState<File | null>()
  const imageRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    dispatch(getProfile(id as string))
  }, [id])

  const handleImageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files
    setImageFile(newImage?.[0])
    if (newImage && newImage.length > 0) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(newImage[0])
    }
    e.target.value = ""
  }
  const handleChangeOnClick = () => {
    setShowModal(true)
    imageRef.current?.click()
  }
  const handleChooseImageOnHover = () => {
    if (id === currentUser?.id) {
      setOnHoverChooseImage(true)
    }
  }
  const closeModal = () => {
    setShowModal(false)
    setPreview(currentUser?.image)
    setNewUsername(currentUser?.username)
  }
  const handleUpdateProfile = () => {
    dispatch(uploadUserAvatarAsync(id as string, imageFile as File))
    dispatch(
      updateUserByIdAsync(id as string, {
        username: newUsername,
      }),
    )
    setShowModal(false)
  }

  return (
    <>
      <input
        type="file"
        accept="image/png,image/jpeg"
        ref={imageRef}
        onChange={handleImageOnChange}
        className="hidden"
      />
      <div className="w-full text-linkwater">
        <div className="h-88 bg-gradient-to-b from-neutral-400 to-transparent shadow-2xl shadow-neutral-500/8 relative px-9">
          {user && (
            <div className="absolute flex bottom-9 items-center gap-4">
              <div
                className="relative"
                onMouseOver={handleChooseImageOnHover}
                onMouseOut={() => setOnHoverChooseImage(false)}
              >
                {user?.image === "" ? (
                  <div className="bg-neutral-700 rounded-full w-60 h-60 flex items-center justify-center shadow-lg shadow-black/50">
                    <BsPerson size={128} />
                  </div>
                ) : (
                  <img
                    src={user?.image}
                    alt="avatar"
                    className="w-60 h-60 rounded-full object-cover shadow-lg shadow-black/50"
                  />
                )}
                {onHoverChooseImage && (
                  <div
                    className="absolute top-0 w-60 h-60 text-center flex flex-col items-center justify-center bg-black/50 rounded-full"
                    onClick={handleChangeOnClick}
                  >
                    <BsPencil size={60} />
                    Choose photo
                  </div>
                )}
              </div>
              <div className="font-bold">
                <p className="text-sm">Profile</p>
                <h1 className="text-6xl">{user?.username}</h1>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <ProfileModal
          onClose={closeModal}
          onChange={handleChangeOnClick}
          previewImg={preview}
        >
          <div className="flex flex-col gap-2 flex-grow items-end">
            <input
              type="text"
              value={newUsername ? newUsername : currentUser?.username}
              onChange={(e) => {
                setNewUsername(e.target.value)
              }}
              className="bg-neutral-800 p-2 focus:border-neutral-500 focus:outline-none focus:border rounded-md w-full"
            />
            <button
              className="bg-jarcata rounded-full text-lg font-bold text-linkwater p-2 w-1/3"
              onClick={handleUpdateProfile}
            >
              Save
            </button>
          </div>
        </ProfileModal>
      )}
    </>
  )
}

export default ProfilePage
