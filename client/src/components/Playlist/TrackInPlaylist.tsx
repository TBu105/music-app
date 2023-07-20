import React from "react"
import { Track } from "../../app/types"
import { duration } from "../../utils/utils"
import { BsThreeDots } from "react-icons/bs"

type Props = {
  track: Track
  index: number
}

const TrackInPlaylist = ({ index, track }: Props) => {
  return (
    <div className="flex my-4 text-linkwater items-center justify-between gap-4 px-4 relative">
      <span>{index + 1}</span>
      <div className="flex-grow flex items-center gap-4">
        <img
          src={track.thumbnail}
          alt="thumbnail"
          className="object-cover w-10 h-10"
        />
        <div className="overflow-hidden">
          <h3>{track.title}</h3>
          <p className="text-xs opacity-50">{track.artist}</p>
        </div>
      </div>
      <div className="text-xs opacity-50 mr-4">{duration(track)}</div>
      <button className="absolute right-2 opacity-50">
        <BsThreeDots />
      </button>
    </div>
  )
}

export default TrackInPlaylist
