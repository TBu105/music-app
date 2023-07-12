import { useAppSelector } from "../app/hooks"
import { Track } from "../app/types"
import TrackCard from "../components/Card/TrackCard"

const Homepage = () => {
  const newSong = useAppSelector((state) => state.track.newUpload)
  const fakeData = () => {
    var lorem =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc magna metus, vestibulum ut dapibus a, tincidunt eu nunc. Donec in lorem augue. Pellentesque tempus neque lacus, eget dignissim massa finibus nec."
    var array = lorem.split(" ")
    var title = array.filter((v, i) => !(i % 2))
    var artist = array.filter((v, i) => i % 2)
    const result: any = []
    for (let i = 0; i < 7; i++) {
      const song = {
        title: title[i],
        artist: artist[i],
      }
      result.push(song)
    }
    return result
  }
  const sortedNewSong = Object.values(newSong).reverse()
  const data = fakeData()
  return (
    <div className="mt-20 mx-9 text-linkwater">
      {/* Actual content */}
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold">New releases</h2>
        <div className="grid grid-cols-7 my-4 gap-4">
          {/* <div className="bg-neutral-900 max-h-64 w-48 my-4 rounded-md p-3 overflow-hidden">
            <div className="aspect-square bg-gradient-to-r from-cyan-600 to-blue-600 rounded"></div>
            <p className="mt-2 text-2xl font-bold">Lorem</p>
            <span className="opacity-60 text-sm">ipsum</span>
          </div> */}
          {newSong.length > 0 &&
            sortedNewSong.map((track: Track, index) => (
              <TrackCard track={track} key={index} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage
