import { IncompletePlaylist } from "../../app/types"
import { useNavigate } from "react-router-dom"

type Props = {
  playlist: IncompletePlaylist
}

const PlaylistItem = ({ playlist }: Props) => {
  const navigate = useNavigate()

  return (
    <div
      className="flex h-16 p-1 gap-2 cursor-pointer"
      onClick={() => navigate(`playlist/${playlist.id}`)}
    >
      <img
        src={playlist.thumbnail}
        alt={playlist.title}
        className="rounded-sm aspect-square h-full object-cover"
      />
      <div className="flex flex-col">
        <span className="font-medium text-base">{playlist.title}</span>
        <span className="font-normal text-sm text-linkwater/50">
          Playlist &#8226;{" "}
          {playlist.title == "Liked Music"
            ? `${playlist.trackIds.length} songs`
            : playlist.creator}
        </span>
      </div>
    </div>
  )
}

export default PlaylistItem
