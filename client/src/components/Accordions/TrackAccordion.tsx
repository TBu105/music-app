import React from "react"
import { BsDashLg, BsPlus } from "react-icons/bs"

type Props = {
  file: File
  active: string
  setActive: (index: string) => void
}

const TrackAccordion = ({ file, active, setActive }: Props) => {
  return (
    <div className="bg-zinc-800 rounded-lg">
      <div className="bg-neutral-800 flex justify-between p-4 rounded-lg">
        <span className="underline decoration-jarcata decoration-2 underline-offset-4">
          {file.name}
        </span>
        <button onClick={() => setActive(file.name)}>
          {active == file.name ? <BsDashLg size={24} /> : <BsPlus size={24} />}
        </button>
      </div>
      {active == file.name && "this is where you'll edit"}
    </div>
  )
}

export default TrackAccordion
