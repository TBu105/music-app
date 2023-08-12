import React from "react"
import { BsMusicNoteList } from "react-icons/bs"
import { useLocation, useNavigate } from "react-router-dom"

const CheckOnQueue = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isQueueActive = location.pathname == "/queue"
  const handleToggleShowQueue = () => {
    if (isQueueActive) navigate(-1)
    else navigate("/queue")
  }
  return (
    <button
      className={`${isQueueActive ? "text-jarcata-500" : "text-linkwater"} `}
      onClick={handleToggleShowQueue}
    >
      <BsMusicNoteList size={20} />
    </button>
  )
}

export default CheckOnQueue
