import React from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

const ButtonLayout = ({ children }: any) => {
  return <button className="bg-jarcata p-2 rounded-full">{children}</button>
}

const HistoryNavigation = () => {
  return (
    <div className="flex gap-2">
      <ButtonLayout>
        <BsChevronLeft />
      </ButtonLayout>
      <ButtonLayout>
        <BsChevronRight />
      </ButtonLayout>
    </div>
  )
}

export default HistoryNavigation
