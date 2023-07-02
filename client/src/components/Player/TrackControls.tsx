import { useMemo, useRef, useState } from "react"
import { Duration } from "../Durations"
import {
  BsPauseFill,
  BsPlayFill,
  BsRepeat,
  BsShuffle,
  BsSkipEndFill,
  BsSkipStartFill,
} from "react-icons/bs"
import ProgressBar from "./ProgressBar"

type Props = {
  playerRef: any
  playing: boolean
  loop: boolean
  volume: number
  muted: boolean
  progress: number
  duration: number

  handlePlay: () => void
  handlePause: () => void
  toggleLoop: () => void
  handleNext: () => void
  handlePrevious: () => void
}

const TrackControls = ({
  playerRef,
  loop,
  playing,
  progress,
  duration,
  handlePlay,
  toggleLoop,
  handlePause,
  handleNext,
  handlePrevious,
}: Props) => {
  const [played, setPlayed] = useState<number>(0)
  const [seeking, setSeeking] = useState<boolean>(false)
  const playPauseButtonRef = useRef<HTMLButtonElement>(null)

  const togglePlayAndPause = () => {
    if (playing) {
      handlePause()
    } else {
      handlePlay()
    }
  }

  const handleSeekChange = (e: any) => {
    setSeeking(true)
    setPlayed(parseFloat(e))
  }

  const handleSeekMouseUp = (e: any) => {
    playerRef.current.seekTo(parseFloat(e))
    setSeeking(false)
  }

  useMemo(() => {
    setPlayed((prevPlayed) => {
      if (!seeking && prevPlayed != progress) {
        return progress
      }
      return prevPlayed
    })
  }, [progress])

  return (
    <div className="w-1/3">
      <div className="flex justify-center gap-2 mx-auto text-neutral-800">
        <button className="hover:text-linkwater">
          <BsShuffle size={22} />
        </button>
        <button className="hover:text-linkwater" onClick={handlePrevious}>
          <BsSkipStartFill size={32} />
        </button>
        <button onClick={togglePlayAndPause} className="text-linkwater">
          {playing ? <BsPauseFill size={42} /> : <BsPlayFill size={42} />}
        </button>
        <button className="hover:text-linkwater" onClick={handleNext}>
          <BsSkipEndFill size={32} />
        </button>
        <button
          onClick={toggleLoop}
          className={`hover:text-linkwater ${loop && "text-jarcata-500"}`}
        >
          <BsRepeat size={22} />
        </button>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <Duration seconds={duration * played} />
        {/* <div className="w-full relative flex items-center">
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="w-full h-2 rounded-lg appearance-none bg-neutral-500 accent-linkwater absolute"
          />
          <div
            style={{ width: played * 100 + "%" }}
            className="h-2 rounded-lg bg-jarcata-500 absolute flex justify-end items-center"
          >
            <div className="h-3 w-3 rounded-lg bg-linkwater absolute right-0"></div>
          </div>
        </div> */}
        <ProgressBar
          currentTime={played}
          duration={duration}
          onTimeUpdate={function (time: number): void {
            handleSeekChange(time)
          }}
          onMouseUpSeek={function (time: number): void {
            handleSeekMouseUp(time)
          }}
        />
        <Duration seconds={duration} />
      </div>
    </div>
  )
}

export default TrackControls