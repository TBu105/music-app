import { useState } from "react"

type Props = {
  currentTime: number
  duration: number
  onTimeUpdate: (time: number) => void
  onMouseUpSeek: (time: number) => void
}

const ProgressBar = (props: Props) => {
  const [hover, setHover] = useState(false)
  const { currentTime, onTimeUpdate, onMouseUpSeek } = props

  const currentPercentage = currentTime * 100

  const calcClickedTime = (e: any) => {
    const clickPositionInPage = e.pageX
    const bar = document.querySelector(".bar__progress") as HTMLElement
    const barStart = bar.getBoundingClientRect().left + window.scrollX
    const barWidth = bar.offsetWidth
    const clickPositionInBar = clickPositionInPage - barStart
    const progressSeeked = clickPositionInBar / barWidth
    // fucking hacky way to make a max & min range
    if (clickPositionInBar > barWidth) return 1
    if (clickPositionInBar < 0) return 0
    return progressSeeked // value return is a decimal between 0 & 1
  }

  const handleTimeDrag = (e: any) => {
    onTimeUpdate(calcClickedTime(e))

    const updateTimeOnMove = (eMove: any) => {
      onTimeUpdate(calcClickedTime(eMove))
    }

    document.addEventListener("mousemove", updateTimeOnMove)

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove)
    })
  }

  return (
    <div
      className="w-full relative flex items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="bar__progress h-[5px] rounded-lg w-full"
        style={{
          background: `linear-gradient(to right,${
            hover ? "#5B4884" : "white"
          } ${currentPercentage}%, rgb(115 115 115) 0)`,
        }}
        onMouseDown={handleTimeDrag}
        onMouseUp={(e) => onMouseUpSeek(calcClickedTime(e))}
      >
        <span
          className="bar__progress__knob relative bg-linkwater h-3 w-3 -top-[2.5px] rounded-full hidden"
          style={{
            left: `${currentPercentage - 2}%`,
            display: `${hover ? "block" : "none"}`,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
