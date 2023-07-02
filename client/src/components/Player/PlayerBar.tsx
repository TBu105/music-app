import { useEffect, useRef } from "react"
import TrackDetail from "./TrackDetail"
import TrackControls from "./TrackControls"
import ReactPlayer from "react-player"
import VolumeSlider from "./VolumeSlider"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  initQueue,
  playerDuration,
  playerMute,
  playerProgress,
  setPause,
  setPlay,
  setVolume,
  toggleLoopSingleTrack,
  nextTrack,
  previousTrack,
  initFirstTrack,
} from "../../features/player/playerSlice"
import { OnProgressProps } from "react-player/base"

const PlayerBar = () => {
  const playerRef = useRef<ReactPlayer | null>(null)
  const {
    progress,
    duration,
    playing,
    volume,
    muted,
    loopTrack,
    queue,
    playerQueue,
    currentSong,
  } = useAppSelector((state) => state.player)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initQueue())
    dispatch(initFirstTrack())
  }, [])

  useEffect(() => {
    console.log(queue)
  }, [queue])

  const handlePlay = () => {
    dispatch(setPlay())
  }

  const handlePause = () => {
    dispatch(setPause())
  }

  const handleVolumeChange = (newVolume: number) => {
    dispatch(setVolume(newVolume))
  }

  const toggleMute = () => {
    dispatch(playerMute())
  }

  const handleProgress = (state: OnProgressProps) => {
    dispatch(playerProgress(state))
  }

  const handleDuration = (duration: number) => {
    dispatch(playerDuration(duration))
  }

  const toggleLoop = () => {
    dispatch(toggleLoopSingleTrack())
  }

  const handleNextSong = () => {
    if (queue >= playerQueue.length - 1) return
    dispatch(nextTrack())
  }

  const handlePreviousSong = () => {
    if (queue == 0) return
    dispatch(previousTrack())
  }

  return (
    <div className="absolute bottom-0 bg-black text-linkwater w-full h-28 flex items-center justify-between">
      <ReactPlayer
        ref={playerRef}
        url={currentSong?.audio}
        playing={playing}
        volume={volume}
        muted={muted}
        loop={loopTrack}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onDuration={handleDuration}
        style={{ display: "none" }}
      />
      {currentSong && (
        <TrackDetail
          title={currentSong.title}
          artist={currentSong.artist}
          thumbnail={currentSong.thumbnail}
        />
      )}
      <TrackControls
        playerRef={playerRef}
        playing={playing}
        loop={loopTrack}
        volume={volume}
        muted={muted}
        progress={progress}
        duration={duration}
        handlePlay={handlePlay}
        handlePause={handlePause}
        toggleLoop={toggleLoop}
        handleNext={handleNextSong}
        handlePrevious={handlePreviousSong}
      />
      <VolumeSlider
        volume={volume}
        muted={muted}
        toggleMute={toggleMute}
        handleVolumeChange={handleVolumeChange}
      />
    </div>
  )
}

export default PlayerBar