import React, { useState, useRef, ChangeEvent } from "react"
import { useAppSelector } from "../app/hooks"
import { BsPencil, BsPerson, BsX } from "react-icons/bs"

const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user)
  const [onHoverChooseImage, setOnHoverChooseImage] = useState(false)
  const [onHoverUpdateImage, setonHoverUpdateImage] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState<string | null | undefined>(user?.image)
  const [newUsername, setNewUsername] = useState(user?.username)
  const imageRef = useRef<HTMLInputElement>(null)

  const handleImageOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files
    if (newImage && newImage.length > 0) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result)
      }
      reader.readAsDataURL(newImage[0])
    }
  }
  const handleChangeOnClick = () => {
    setShowModal(true)
    imageRef.current?.click()
  }
  const closeModal = () => {
    setShowModal(false)
    setPreview(user?.image)
    setNewUsername(user?.username)
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={imageRef}
        onChange={handleImageOnChange}
        className="hidden"
      />
      <div className="w-full text-linkwater">
        <div className="h-88 bg-gradient-to-b from-neutral-400 to-transparent shadow-2xl shadow-neutral-500/8 relative px-9">
          <div className="absolute flex bottom-9 items-center gap-4">
            <div
              className="relative"
              onMouseOver={() => setOnHoverChooseImage(true)}
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
        </div>
      </div>
      {showModal && (
        <>
          <div
            className="bg-black/50 fixed inset-0 z-20"
            onClick={() => closeModal}
          ></div>
          <div className="fixed inset-0 flex justify-center items-center z-30">
            <div className="w-1/3 bg-neutral-900 p-8 rounded-lg relative">
              <h3 className="text-2xl font-bold">Profiles details</h3>
              <button className="absolute right-8 top-8" onClick={closeModal}>
                <BsX size={32} />
              </button>
              <div className="flex py-6 items-center gap-4">
                <div
                  className="relative"
                  onMouseOver={() => setonHoverUpdateImage(true)}
                  onMouseOut={() => setonHoverUpdateImage(false)}
                >
                  {preview === null ? (
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
                  {onHoverUpdateImage && (
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
                  <button className="bg-jarcata rounded-full text-lg font-bold text-linkwater p-2 w-1/3">
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

export default ProfilePage
