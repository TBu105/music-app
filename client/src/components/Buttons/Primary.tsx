import React from "react"

type Props = {
  children?: React.ReactNode
  onClick: () => void
}

const Primary = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="py-1.5 px-4 bg-jarcata rounded-full text-[12px] font-bold text-linkwater"
    >
      {children}
    </button>
  )
}

export default Primary
