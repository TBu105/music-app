import React from "react"
import { BsPlayFill } from "react-icons/bs"
import { Track } from "../../app/types"
import { useAppDispatch } from "../../app/hooks"
import { addToQueue, playNewSong } from "../../features/player/playerSlice"

type Props = {
  track: Track
}

const TrackCard = ({ track }: Props) => {
  const dispatch = useAppDispatch()
  const handlePlaySong = () => {
    dispatch(addToQueue(track))
    dispatch(playNewSong())
  }
  return (
    <div className="bg-neutral-900 h-72 rounded-md p-4 overflow-hidden hover:bg-neutral-800 transition-colors duration-500 group">
      <div className="relative">
        <img
          src={track.thumbnail}
          alt=""
          className="w-44 aspect-square object-fill rounded"
        />
        <button
          className="rounded-full w-12 aspect-square absolute -bottom-2 right-1 bg-jarcata-500 flex justify-center items-center opacity-0 group-hover:opacity-100 group-hover:bottom-1 transition-all duration-500"
          onClick={handlePlaySong}
        >
          <BsPlayFill size={28} />
        </button>
      </div>
      <p className="mt-2 font-extrabold truncate">{track.title}</p>
      <span className="opacity-60 text-sm">{track.artist}</span>
    </div>
  )
}

export default TrackCard
