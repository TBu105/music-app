import React from "react"

type Props = {
  active: number
  setActive: (tab: number) => void
}

const UploadTabSelect = (props: Props) => {
  return (
    <div className="flex rounded-full p-1 bg-neutral-800 gap-2 w-3/4 font-semibold text-center my-4">
      <div
        className={
          props.active == 1
            ? "bg-jarcata-500 rounded-full py-1 flex-1"
            : "flex-1 py-1"
        }
        onClick={() => props.setActive(1)}
      >
        Upload
      </div>
      <div
        className={
          props.active == 2
            ? "bg-jarcata-500 rounded-full py-1 flex-1"
            : "flex-1 py-1"
        }
        onClick={() => props.setActive(2)}
      >
        Metadata
      </div>
      <div
        className={
          props.active == 3
            ? "bg-jarcata-500 rounded-full py-1 flex-1"
            : "flex-1 py-1"
        }
        onClick={() => props.setActive(3)}
      >
        Advanced
      </div>
      <div
        className={
          props.active == 4
            ? "bg-jarcata-500 rounded-full py-1 flex-1"
            : "flex-1 py-1"
        }
        onClick={() => props.setActive(4)}
      >
        Your uploads
      </div>
    </div>
  )
}

export default UploadTabSelect
