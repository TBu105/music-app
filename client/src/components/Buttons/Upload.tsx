import React, { useState } from "react"
import Primary from "./Primary"
import { BsUpload } from "react-icons/bs"
import UploadModals from "../Upload/UploadModals"

type Props = {}

const Upload = (props: Props) => {
  const [showed, setShowed] = useState(false)
  const handleOnClose = () => {
    setShowed(false)
  }
  return (
    <>
      <Primary
        onClick={() => {
          setShowed(true)
        }}
      >
        <div className="flex items-center gap-1 px-2">
          <BsUpload size={12} />
          <span>Upload</span>
        </div>
      </Primary>
      <UploadModals show={showed} onClose={handleOnClose} />
    </>
  )
}

export default Upload
