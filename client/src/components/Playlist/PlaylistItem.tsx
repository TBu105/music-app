import React, { useEffect, useState } from "react"
import { Playlist } from "../../app/types"
import axios from "axios"

type Props = {
  playlist: Playlist
}

const PlaylistItem = ({ playlist }: Props) => {
  const [creator, setCreator] = useState("")

  useEffect(() => {
    if (!playlist.creator) return

    axios.get(`/api/v1/user/${playlist.creator}`).then((response) => {
      const creatorName = response.data.user.username
      setCreator(creatorName)
    })
  }, [])

  return (
    <div className="flex h-16 p-1 gap-2">
      <img
        src={playlist.thumbnail}
        alt={playlist.title}
        className="rounded-sm aspect-square h-full"
      />
      <div className="flex flex-col">
        <span className="font-medium text-base">{playlist.title}</span>
        <span className="font-normal text-sm text-linkwater/50">
          Playlist &#8226; {creator}
        </span>
      </div>
    </div>
  )
}

export default PlaylistItem
