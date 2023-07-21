import React, { useEffect, useRef, useState } from "react"
import { BsCollection, BsPlus } from "react-icons/bs"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { createNewPlaylist } from "../../features/playlist/playlistSlice"

const PlaylistDropdown = () => {
  const [toggleModal, setToggleModal] = useState(false)
  const dialogRef: React.RefObject<HTMLDivElement> = useRef(null)
  const dispatch = useAppDispatch()
  const currentUserPlaylists = useAppSelector(
    (state) => state.playlist.currentUserPlaylist,
  )

  const handleToggleModal = () => {
    setToggleModal(!toggleModal)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      setToggleModal(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  const handleCreateNewPlaylist = () => {
    const numberOfPlaylists = currentUserPlaylists.length + 1
    const defaultNewPlaylistTitle = `My Playlist #${numberOfPlaylists}`

    dispatch(createNewPlaylist(defaultNewPlaylistTitle))
  }
  return (
    <div className="relative h-8 w-8 -right-4">
      <button
        className="absolute right-0 inset-y-0"
        onClick={handleToggleModal}
      >
        <BsPlus size={32} />
      </button>
      {toggleModal && (
        <>
          <div
            className="bg-neutral-800 absolute left-0 top-10 rounded text-base font-normal w-48 p-1 shadow-lg shadow-black/50"
            ref={dialogRef}
          >
            <button
              className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-sm w-full"
              onClick={handleCreateNewPlaylist}
            >
              <BsCollection />
              Create new playlist
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default PlaylistDropdown
