import React, { useRef, useState } from "react"
import TrackDetail from "./TrackDetail"
import TrackControls from "./TrackControls"
import ReactPlayer from "react-player"
import VolumeSlider from "./VolumeSlider"

const PlayerBar = () => {
  const playerRef = useRef<ReactPlayer | null>(null)
  const [playing, setPlaying] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.5)
  const [progress, setProgress] = useState<number>(0)
  const [loop, setLoop] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0)

  const handlePlay = () => {
    setPlaying(true)
  }

  const handlePause = () => {
    setPlaying(false)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
  }

  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted)
  }

  const handleProgress = (state: any) => {
    setProgress(state.played)
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  const toggleLoop = () => {
    setLoop((prevLoop) => !prevLoop)
  }
  return (
    <div className="absolute bottom-0 bg-black text-linkwater w-full h-28 flex items-center justify-between px-4">
      <ReactPlayer
        ref={playerRef}
        url={
          "https://res.cloudinary.com/drwdeujt6/video/upload/v1685861441/y2mate.com_-_17_Move_Me_R4_Ridge_Racer_Type_4_Direct_Audio_lziel6.mp3"
        }
        playing={playing}
        volume={volume}
        muted={muted}
        loop={loop}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onDuration={handleDuration}
        style={{ display: "none" }}
      />
      <TrackDetail title={""} artist={""} thumbnail={""} />
      <TrackControls
        playerRef={playerRef}
        playing={playing}
        loop={loop}
        volume={volume}
        muted={muted}
        progress={progress}
        duration={duration}
        handlePlay={handlePlay}
        handlePause={handlePause}
        toggleLoop={toggleLoop}
        handleNext={function (): void {
          throw new Error("Function not implemented.")
        }}
        handlePrevious={function (): void {
          throw new Error("Function not implemented.")
        }}
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
