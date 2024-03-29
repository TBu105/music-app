import React, { useEffect, useRef, useState } from "react"
import { BsCaretRightFill, BsThreeDots } from "react-icons/bs"
import { Playlist, Track } from "../../app/types"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  addTrackToLikedMusic,
  addTrackToPlaylist,
  createNewPlaylist,
} from "../../features/playlist/playlistSlice"
import { addToQueue } from "../../features/player/playerSlice"

type Props = {
  track: Track
}

const TrackDropdown = ({ track }: Props) => {
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const dialogRef: React.RefObject<HTMLDivElement> = useRef(null)
  const dispatch = useAppDispatch()
  const currentUserPlaylists = useAppSelector(
    (state) => state.playlist.currentUserPlaylist,
  )

  const handleToggleDropdown = () => {
    setToggleDropdown(!toggleDropdown)
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

  const handleAddTrackToPlaylist = (id: string) => {
    dispatch(addTrackToPlaylist(id, track))
    setToggleDropdown(false)
  }
  const handleAddToQueue = () => {
    dispatch(addToQueue(track))
  }
  const handleLikedSong = () => {
    dispatch(addTrackToLikedMusic(track))
    setToggleDropdown(false)
  }

  return (
    <div className="relative h-8 w-8">
      <button
        className="absolute right-0 inset-y-0"
        onClick={handleToggleDropdown}
      >
        <BsThreeDots size={32} />
      </button>
      {toggleDropdown && (
        <>
          <div
            className="bg-neutral-800 absolute left-0 top-10 rounded text-base font-normal w-48 p-1"
            ref={dialogRef}
          >
            <button
              className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-sm w-full justify-between group relative border-b border-white/5"
              onClick={handleAddToQueue}
            >
              Add to queue
            </button>
            <button
              className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-sm w-full justify-between group relative"
              onClick={handleLikedSong}
            >
              Save to Liked Music
            </button>
            <div className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-sm w-full justify-between group relative">
              Add to playlists <BsCaretRightFill />
              <div className="bg-neutral-800 absolute left-full top-0 rounded text-base font-normal w-48 p-1 hidden group-hover:block hover:block">
                <button
                  className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-sm w-full justify-between group relative"
                  onClick={() => {}}
                >
                  Create playlist
                </button>
                {currentUserPlaylists
                  .filter((playlist) => playlist.title != "Liked Music")
                  .map((playlist, index) => (
                    <button
                      key={index}
                      className={`flex items-center gap-2 hover:bg-white/5 p-2 rounded-sm w-full justify-between group relative border-white/5 ${
                        index == 0 && "border-t"
                      }`}
                      onClick={() => handleAddTrackToPlaylist(playlist.id)}
                    >
                      {playlist.title}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TrackDropdown
