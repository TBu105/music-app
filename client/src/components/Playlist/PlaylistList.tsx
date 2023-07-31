import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getCurrentUserPlaylist } from "../../features/playlist/playlistSlice"
import PlaylistItem from "./PlaylistItem"
import PlaylistItemSkeleton from "./PlaylistItemSkeleton"

const PlaylistList = () => {
  const dispatch = useAppDispatch()
  const currentUserId = useAppSelector((state) => state.auth.currentUser?.id)
  const currentUserPlaylists = useAppSelector(
    (state) => state.playlist.currentUserPlaylist,
  )
  const loading = useAppSelector((state) => state.playlist.loading)

  useEffect(() => {
    if (!currentUserId) return

    dispatch(getCurrentUserPlaylist(currentUserId))
  }, [currentUserId])

  if (loading) return <PlaylistItemSkeleton itemCount={7} />
  return (
    <div className="flex flex-col mb-28 gap-2">
      {currentUserPlaylists.map((playlist, index) => (
        <PlaylistItem key={index} playlist={playlist} />
      ))}
    </div>
  )
}

export default PlaylistList
