import React, { useState } from "react"
import { BsX } from "react-icons/bs"
import UploadTabSelect from "./UploadTabSelect"
import TabsContent from "./TabsContent"

type Props = {
  show: boolean
  onClose: () => void
}

const UploadModals = (props: Props) => {
  const [active, setActive] = useState(1)
  return (
    props.show && (
      <>
        <div
          className="bg-black/50 fixed inset-0 z-20"
          onClick={props.onClose}
        ></div>
        <div className="fixed w-2/5 h-[90%] inset-0 m-auto z-30">
          <div className="bg-neutral-900 p-8 rounded-lg relative h-full">
            <h1 className="text-3xl font-bold">Upload your music</h1>
            <button className="absolute right-2 top-2" onClick={props.onClose}>
              <BsX size={32} />
            </button>
            <UploadTabSelect
              active={active}
              setActive={(tab: number) => {
                setActive(tab)
              }}
            />
            <TabsContent active={active} />
          </div>
        </div>
      </>
    )
  )
}

export default UploadModals
