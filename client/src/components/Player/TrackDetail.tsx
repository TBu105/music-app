type Props = {
  title: string
  artist: string
  thumbnail: string
}

const TrackDetail = ({ title, artist, thumbnail }: Props) => {
  return (
    <div className="flex gap-4">
      <img
        src={
          "https://images.pushsquare.com/5530ddb68ef0f/ridge-racer-type-4-cover.cover_large.jpg"
        }
        alt="thumbnail"
        width={72}
        height={72}
        className="rounded-lg"
      />
      <div>
        <h3 className="text-xl font-bold">Lorem Ipsum</h3>
        <span className="text-sm text-neutral-500">artist name</span>
      </div>
    </div>
  )
}

export default TrackDetail
