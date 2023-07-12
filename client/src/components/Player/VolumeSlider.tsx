import React from "react"
import { BsVolumeMuteFill, BsVolumeUpFill } from "react-icons/bs"

type Props = {
  volume: number
  muted: boolean

  toggleMute: () => void
  handleVolumeChange: (newVolume: number) => void
}

const VolumeSlider = ({
  volume,
  muted,
  toggleMute,
  handleVolumeChange,
}: Props) => {
  const handleChangeInVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleVolumeChange(Number(e.target.value))
  }
  return (
    <div className="flex justify-end items-center px-4 gap-1 rounded-lg w-1/3">
      <button className="" onClick={toggleMute}>
        {muted ? <BsVolumeMuteFill size={24} /> : <BsVolumeUpFill size={24} />}
      </button>
      <input
        type="range"
        className="w-24 h-1 rounded-lg appearance-none bg-neutral-500 accent-linkwater"
        min={0}
        max={1}
        step={0.001}
        value={volume}
        onChange={handleChangeInVolume}
      />
    </div>
  )
}

export default VolumeSlider
