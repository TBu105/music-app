type Props = {
  title: string
  artist: string
  thumbnail: string
}

const TrackDetail = ({ title, artist, thumbnail }: Props) => {
  return (
    <div className="flex gap-4">
      <img
        src={thumbnail}
        alt="thumbnail"
        width={72}
        height={72}
        className="rounded-lg"
      />
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="text-sm text-neutral-500">{artist}</span>
      </div>
    </div>
  )
}

export default TrackDetail
