import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { useEffect, useState } from "react"
import { getColor, rgbToHex } from "../utils/colorthief"
import { fetchTrackById } from "../features/track/trackSlice"
import {
  addToQueue,
  playNewSong,
  setPause,
} from "../features/player/playerSlice"
import { Track } from "../app/types"
import { BsHeart, BsPauseFill, BsPlayFill, BsThreeDots } from "react-icons/bs"
import { duration } from "../utils/utils"
import TrackDropdown from "../components/Track/TrackDropdown"

const TrackPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const player = useAppSelector((state) => state.player)
  const track = useAppSelector((state) => state.track.viewedTrack)

  // fetching user
  const loading = useAppSelector((state) => state.track.loading)
  const [bgColor, setBgColor] = useState("#777777")

  const setTrackBackgroundColor = (image: string) => {
    getColor(image).then((color) => {
      const result = color as number[]
      setBgColor(`${result[0]},${result[1]},${result[2]}`)
    })
  }

  const publicDate = new Date(track?.publicDate as Date)
  const year = publicDate.getFullYear()

  useEffect(() => {
    const isSameTrack = track?.id == id
    if (isSameTrack) return
    dispatch(fetchTrackById(id as string))
      .unwrap()
      .then((track) => {
        setTrackBackgroundColor(track.thumbnail)
      })
  }, [id])

  const handlePlaySong = () => {
    if (player.playing && track?.id == player.currentSong?.id) {
      dispatch(setPause())
    } else {
      dispatch(addToQueue(track as Track))
      dispatch(playNewSong())
    }
  }

  if (!loading && track)
    return (
      <div className="w-full text-linkwater">
        <div
          style={{
            backgroundColor: `rgba(${bgColor},0.4)`,
            boxShadow: `0 120px 120px 20px rgba(${bgColor},0.2)`,
          }}
          className="h-88 shadow-2xl shadow-neutral-500/8 relative px-9"
        >
          <div className="absolute flex bottom-9 items-end gap-4">
            <div className="relative">
              <img
                src={track.thumbnail}
                alt="avatar"
                className="w-60 h-60 object-cover shadow-lg shadow-black/50"
              />
            </div>
            <div className="font-bold flex flex-col gap-2">
              <p className="text-sm">Song</p>
              <h1 className="text-6xl">{track?.title}</h1>
              <p className="text-sm mt-10">
                {track.artist} &#8226;{" "}
                <span className="font-normal">
                  {track.title} &#8226; {year} &#8226; {duration(track)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mx-9 my-4">
          <div className="flex items-center gap-8">
            <button
              className="rounded-full w-16 h-16 bg-jarcata-500 flex justify-center items-center hover:brightness-105"
              onClick={handlePlaySong}
            >
              {player.playing && track?.id == player.currentSong?.id ? (
                <BsPauseFill size={42} />
              ) : (
                <BsPlayFill size={42} />
              )}
            </button>
            <button>
              <BsHeart size={32} />
            </button>
            <TrackDropdown track={track} />
          </div>
          <h2 className="font-bold text-2xl my-4">Lyrics</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: track?.lyrics?.replace(/\n/g, "<br/>") as string,
            }}
            className="text-linkwater/50"
          ></div>
          quite obvious since this shit ain't free
        </div>
      </div>
    )
}

export default TrackPage
