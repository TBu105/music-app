import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Track } from "../app/types"
import TrackCard from "../components/Card/TrackCard"
import TrackCardSkeleton from "../components/Skeletons/TrackCardSkeleton"
import { getNewUpload } from "../features/track/trackSlice"

const Homepage = () => {
  const dispatch = useAppDispatch()
  const newSong = useAppSelector((state) => state.track.newUpload)
  const loading = useAppSelector((state) => state.track.loading)
  const sortedNewSong = Object.values(newSong).reverse()

  useEffect(() => {
    dispatch(getNewUpload())
  }, [])

  return (
    <div className="mt-20 mx-9 text-linkwater">
      {/* Actual content */}
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold">New releases</h2>
        <div className="grid grid-cols-7 my-4 gap-4">
          {loading ? (
            <TrackCardSkeleton itemCount={7} />
          ) : (
            <>
              {sortedNewSong.map((track: Track, index) => (
                <TrackCard track={track} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Homepage
