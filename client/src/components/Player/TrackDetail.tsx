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
        className="rounded-lg object-cover w-[72px] aspect-square"
      />
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-sm text-neutral-500">{artist}</span>
      </div>
    </div>
  )
}

export default TrackDetail
