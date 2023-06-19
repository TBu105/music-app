import React, { useEffect, useState } from "react"
import { BsPencil, BsPerson, BsX } from "react-icons/bs"

type Props = {
  onClose: () => void
  onChange: () => void
  previewImg: string | undefined
  children?: React.ReactNode
}

const ProfileModal = ({ onClose, onChange, previewImg, children }: Props) => {
  const [preview, setPreview] = useState(previewImg)
  const [onHoverUpdateImage, setOnHoverUpdateImage] = useState(false)
  useEffect(() => {
    setPreview(previewImg)
  }, [previewImg])

  return (
    <>
      <div className="bg-black/50 fixed inset-0 z-20" onClick={onClose}></div>
      <div className="fixed w-1/3 h-fit inset-0 m-auto z-30">
        <div className="bg-neutral-900 p-8 rounded-lg relative">
          <h3 className="text-2xl font-bold">Profiles details</h3>
          <button className="absolute right-8 top-8" onClick={onClose}>
            <BsX size={32} />
          </button>
          <div className="flex py-6 items-center gap-4">
            <div
              className="relative"
              onMouseOver={() => setOnHoverUpdateImage(true)}
              onMouseOut={() => setOnHoverUpdateImage(false)}
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
              {onHoverUpdateImage && (
                <div className="absolute top-0 w-52 h-52 text-center flex flex-col items-center justify-center bg-black/50 rounded-full gap-2">
                  <button className="hover:underline" onClick={onChange}>
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
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileModal
