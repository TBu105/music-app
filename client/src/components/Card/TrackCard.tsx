import React from "react"
import { BsPlayFill } from "react-icons/bs"

type Props = {
  songId?: String
  title: String
  artist: String
}

const TrackCard = (props: Props) => {
  return (
    <div className="bg-neutral-900 h-72 flex-1 my-4 rounded-md p-4 overflow-hidden hover:bg-neutral-800 transition-colors duration-500 group">
      <div className="aspect-square bg-gradient-to-r from-cyan-600 to-blue-600 rounded drop-shadow-lg relative">
        <div className="rounded-full w-12 aspect-square absolute -bottom-2 right-1 bg-jarcata-500 flex justify-center items-center opacity-0 group-hover:opacity-100 group-hover:bottom-1 transition-all duration-500">
          <BsPlayFill size={28} />
        </div>
      </div>
      <p className="mt-2 text-2xl font-bold">{props.title}</p>
      <span className="opacity-60 text-sm">{props.artist}</span>
    </div>
  )
}

export default TrackCard
