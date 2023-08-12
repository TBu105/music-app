import { useState } from "react"

type Props = {
  currentTime: number
  duration: number
  onTimeUpdate: (time: number) => void
  onMouseUpSeek: (time: number) => void
}

const ProgressBar = (props: Props) => {
  const { currentTime, onTimeUpdate, onMouseUpSeek } = props
  const [hover, setHover] = useState(false)

  const currentPercentage = currentTime * 100

  const handleTimeDrag = (e: any) => {
    const timeline = document.querySelector(".bar__progress") as HTMLElement
    setHover(true)
    let isScrubbing = false
    function toggleScrubbing(e: any) {
      const rect = timeline.getBoundingClientRect()
      const percent =
        Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
      isScrubbing = (e.buttons & 1) === 1
      if (isScrubbing) {
        handleTimeLineUpdate(e)
      } else {
        onMouseUpSeek(percent - 0.00001)
      }
    }
    const handleTimeLineUpdate = (e: any) => {
      const rect = timeline.getBoundingClientRect()
      const percent =
        Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
      if (isScrubbing) {
        e.preventDefault()
        setHover(true)
      }
      onTimeUpdate(percent)
    }
    timeline.addEventListener("mouseleave", () => setHover(false))
    timeline.addEventListener("mousedown", toggleScrubbing)
    document.addEventListener("mouseup", (e) => {
      if (isScrubbing) toggleScrubbing(e)
      else setHover(false)
    })
    document.addEventListener("mousemove", (e) => {
      if (isScrubbing) {
        handleTimeLineUpdate(e)
      }
    })
  }

  return (
    <div className="w-full flex items-center">
      <div
        className="bar__progress h-[5px] rounded-lg w-full"
        style={{
          background: `linear-gradient(to right,${
            hover ? "#5B4884" : "white"
          } ${currentPercentage}%, rgb(115 115 115) 0)`,
        }}
        onMouseOver={handleTimeDrag}
      >
        <span
          className="bar__progress__knob relative bg-linkwater h-3 w-3 -top-[2.5px] rounded-full hidden"
          style={{
            left: `${Math.max(0, currentPercentage - 2)}%`,
            display: `${hover ? "block" : "none"}`,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
