import React, { useEffect, useRef, useState } from "react"
import { BsPerson, BsPencil, BsX } from "react-icons/bs"
import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  fetchUserById,
  uploadAvatar,
  updateUserById,
} from "../../features/user/userSlice"

const ProfileBanner = () => {
  const user = useAppSelector((state) => state.user.userData)
  const loading = useAppSelector((state) => state.user.loading)
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [onHoverImage, setOnHoverImage] = useState(false)
  const [onHoverImageModal, setOnHoverImageModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState(user?.image)
  const [newUsername, setNewUsername] = useState(user?.username)
  const [imageFile, setImageFile] = useState<File | null>()
  const imageRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    dispatch(fetchUserById(id as string))
  }, [id])

  useEffect(() => {
    setPreview(user?.image)
    setNewUsername(user?.username)
  }, [showModal])

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
      setOnHoverImage(true)
    }
  }
  const closeModal = () => {
    setShowModal(false)
  }
  const handleUpdateProfile = () => {
    if (imageFile) {
      dispatch(uploadAvatar(imageFile as File))
        .unwrap()
        .then((image) => {
          dispatch(
            updateUserById(id as string, {
              username: newUsername,
              image: image,
            }),
          )
        })
    } else {
      dispatch(
        updateUserById(id as string, {
          username: newUsername,
        }),
      )
    }
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
          {!loading && (
            <div className="absolute flex bottom-9 items-center gap-4">
              <div
                className="relative"
                onMouseOver={handleChooseImageOnHover}
                onMouseOut={() => setOnHoverImage(false)}
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
                {onHoverImage && (
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
        <>
          <div
            className="bg-black/50 fixed inset-0 z-20"
            onClick={closeModal}
          ></div>
          <div className="fixed w-1/3 h-fit inset-0 m-auto z-30">
            <div className="bg-neutral-900 p-8 rounded-lg relative">
              <h3 className="text-2xl font-bold">Profiles details</h3>
              <button className="absolute right-8 top-8" onClick={closeModal}>
                <BsX size={32} />
              </button>
              <div className="flex py-6 items-center gap-4">
                <div
                  className="relative"
                  onMouseOver={() => setOnHoverImageModal(true)}
                  onMouseOut={() => setOnHoverImageModal(false)}
                >
                  {!preview ? (
                    <div className="bg-neutral-700 rounded-full w-52 h-52 flex items-center justify-center shadow-lg shadow-black/50">
                      <BsPerson size={80} />
                    </div>
                  ) : (
                    <img
                      src={preview}
                      alt="new_avatar"
                      className="w-52 h-52 rounded-full object-cover shadow-lg shadow-black/50"
                    />
                  )}
                  {onHoverImageModal && (
                    <div className="absolute top-0 w-52 h-52 text-center flex flex-col items-center justify-center bg-black/50 rounded-full gap-2">
                      <button
                        className="hover:underline"
                        onClick={handleChangeOnClick}
                      >
                        Choose photo
                      </button>
                      <BsPencil size={48} />
                      <button
                        className="hover:underline"
                        onClick={() => setPreview("")}
                      >
                        Remove photo
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-grow items-end">
                  <input
                    type="text"
                    value={newUsername}
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProfileBanner
