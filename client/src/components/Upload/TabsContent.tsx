import React from "react"
import UploadTab from "../Tabs/UploadTab"

type Props = {
  active: number
}

const TabsContent = (props: Props) => {
  return (
    <div className="w-full my-4">
      <div className={props.active == 1 ? "block" : "hidden"}>
        <UploadTab />
      </div>
      <div className={props.active == 2 ? "block" : "hidden"}>Metadata</div>
      <div className={props.active == 3 ? "block" : "hidden"}>Advanced</div>
      <div className={props.active == 4 ? "block" : "hidden"}>Your uploads</div>
    </div>
  )
}

export default TabsContent
