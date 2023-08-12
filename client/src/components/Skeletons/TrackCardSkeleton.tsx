import React from "react"

type Props = {
  itemCount: number
}

const TrackCardSkeleton = ({ itemCount }: Props) => {
  const skeletonItems = Array.from({ length: itemCount }, (_, index) => (
    <div
      key={index}
      className="bg-neutral-900 h-72 rounded-md animate-pulse"
    ></div>
  ))

  return <>{skeletonItems}</>
}

export default TrackCardSkeleton
