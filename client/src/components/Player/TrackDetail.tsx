type Props = {
  title: string
  artist: string
  thumbnail: string
}

const TrackDetail = ({ title, artist, thumbnail }: Props) => {
  return (
    <div className="flex gap-4 px-4 w-1/3">
      <img
        src={thumbnail}
        alt="thumbnail"
        className="rounded-lg object-cover w-[72px] h-[72px]"
      />
      <div className="overflow-hidden">
        <h3 className="text-lg font-bold truncate">{title}</h3>
        <p className="text-sm text-neutral-500 truncate">{artist}</p>
      </div>
    </div>
  )
}

export default TrackDetail
