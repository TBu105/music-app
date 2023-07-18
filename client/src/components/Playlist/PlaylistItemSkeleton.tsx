import React from "react"
type Props = {
  itemCount: number
}

const PlaylistItemSkeleton = ({ itemCount }: Props) => {
  const skeletonItems = Array.from({ length: itemCount }, (_, index) => (
    <div className="h-16 w-full bg-neutral-500/5 animate-pulse"></div>
  ))
  return <div className="flex flex-col gap-2">{skeletonItems}</div>
}

export default PlaylistItemSkeleton
