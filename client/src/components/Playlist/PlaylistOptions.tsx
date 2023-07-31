import React, { useEffect, useRef, useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import PlaylistEditModal from "./PlaylistEditModal"
import { FullPlaylist } from "../../app/types"
import { addPlaylistToQueue } from "../../features/player/playerSlice"
import { deletePlaylistById } from "../../features/playlist/playlistSlice"
import { useNavigate } from "react-router-dom"

const PlaylistOptions = () => {
  const viewedPlaylist = useAppSelector(
    (state) => state.playlist.viewedPlaylist,
  )
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
  const dialogRef: React.RefObject<HTMLDivElement> = useRef(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleToggleDropdown = () => {
    setToggleDropdown((prev) => !prev)
  }
  const handleToggleEditModal = () => {
    setToggleDropdown(false)
    setShowEditModal((prev) => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      setToggleDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  const handleAddPlaylistToQueue = () => {
    dispatch(addPlaylistToQueue(viewedPlaylist as FullPlaylist))
  }

  const handleDeletePlaylist = () => {
    if (!viewedPlaylist) return
    dispatch(deletePlaylistById(viewedPlaylist.id))
    navigate("/")
  }

  return (
    <div className="relative h-8 w-8">
      <button onClick={handleToggleDropdown}>
        <BsThreeDots size={32} />
      </button>
      {toggleDropdown && (
        <div
          className="bg-neutral-800 absolute left-0 top-10 rounded text-base font-normal w-48 p-1 shadow-lg shadow-black/50 z-10"
          ref={dialogRef}
        >
          <button
            className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-sm w-full border-b border-white/5"
            onClick={handleAddPlaylistToQueue}
          >
            Add to queue
          </button>
          <button
            className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-sm w-full"
            onClick={handleToggleEditModal}
          >
            Edit details
          </button>
          <button
            className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-sm w-full"
            onClick={handleDeletePlaylist}
          >
            Delete
          </button>
        </div>
      )}
      {showEditModal && (
        <PlaylistEditModal
          toggleModal={handleToggleEditModal}
          imageRef={imageRef}
          playlist={viewedPlaylist as FullPlaylist}
        />
      )}
      {showConfirmDeleteModal}
    </div>
  )
}

export default PlaylistOptions
