import React, { useState } from "react"
import { BsPencil, BsX } from "react-icons/bs"
import { FullPlaylist } from "../../app/types"
import { useAppDispatch } from "../../app/hooks"
import { uploadFile } from "../../utils/uploadfile"
import { updatePlaylistById } from "../../features/playlist/playlistSlice"

type Props = {
  toggleModal: () => void
  imageRef: React.RefObject<HTMLInputElement>
  playlist: FullPlaylist
}

const PlaylistEditModal = ({ toggleModal, imageRef, playlist }: Props) => {
  const dispatch = useAppDispatch()
  const [newPlaylistTitle, setNewPlaylistTitle] = useState(playlist.title)
  const [preview, setPreview] = useState(playlist.thumbnail)
  const [imageFile, setImageFile] = useState<File | null>()

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
  const handleChangeThumbnail = () => {
    imageRef.current?.click()
  }
  const handleUpdatePlaylist = async () => {
    toggleModal()
    if (!imageFile) {
      dispatch(
        updatePlaylistById({
          id: playlist.id,
          title: newPlaylistTitle,
        }),
      )
      return
    }
    const image = await uploadFile(imageFile)
    dispatch(
      updatePlaylistById({
        id: playlist.id,
        title: newPlaylistTitle,
        thumbnail: image,
      }),
    )
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
      <div
        className="bg-black/50 fixed inset-0 z-20"
        onClick={toggleModal}
      ></div>
      <div className="fixed w-1/3 h-fit inset-0 m-auto z-30">
        <div className="bg-neutral-900 p-8 rounded-lg relative">
          <h3 className="text-2xl font-bold">Edit details</h3>
          <button className="absolute right-8 top-8" onClick={toggleModal}>
            <BsX size={32} />
          </button>
          <div className="flex py-6 items-center gap-4">
            <div className="relative group">
              {!preview ? (
                <div className="bg-neutral-700 rounded-full w-52 h-52 flex items-center justify-center shadow-lg shadow-black/50"></div>
              ) : (
                <img
                  src={preview}
                  alt="new_avatar"
                  className="w-52 h-52 object-cover shadow-lg shadow-black/50"
                />
              )}
              <div className="absolute top-0 w-52 h-52 text-center hidden group-hover:flex flex-col items-center justify-center bg-black/50 gap-2">
                <button
                  className="hover:underline"
                  onClick={handleChangeThumbnail}
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
            </div>
            <div className="flex flex-col gap-2 flex-grow items-end">
              <input
                type="text"
                value={newPlaylistTitle}
                onChange={(e) => {
                  setNewPlaylistTitle(e.target.value)
                }}
                className="bg-neutral-800 p-2 rounded w-full focus:outline-neutral-500 outline-none outline-1 outline-offset-0"
              />
              <button
                className="bg-jarcata rounded-full text-lg font-bold text-linkwater p-2 w-1/3"
                onClick={handleUpdatePlaylist}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaylistEditModal
