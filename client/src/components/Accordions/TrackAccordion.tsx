import React, { useRef, useState } from "react"
import { BsDashLg, BsPencilFill, BsPlus } from "react-icons/bs"
import Primary from "../Buttons/Primary"

type Props = {
  file: File
  active: string
  setActive: (index: string) => void
  onCancel: () => void
  defaultPrivacy: boolean
}

const TrackAccordion = ({
  file,
  active,
  setActive,
  onCancel,
  defaultPrivacy,
}: Props) => {
  //Form
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [publicDate, setPublicDate] = useState<Date>()
  const [privacy, setPrivacy] = useState(defaultPrivacy)
  // const audio = new Audio()
  // audio.src = URL.createObjectURL(file)

  // audio.addEventListener("loadedmetadata", () => {
  //   const duration = audio.duration
  //   console.log("Audio duration:", duration)
  // })

  //Thumbnail
  const [preview, setPreview] = useState(
    "http://res.cloudinary.com/music-app-cty/image/upload/v1687221360/ye4wc6m8zyn1y7corc4u.jpg",
  )
  const [thumbnail, setThumbnail] = useState<File | null>()
  const thumbnailRef = useRef<HTMLInputElement>(null)

  const handleThumbnailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files
    setThumbnail(newImage?.[0])
    if (newImage && newImage.length > 0) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(newImage[0])
    }
    e.target.value = ""
  }
  const handleChangeOnClick = () => {
    thumbnailRef.current?.click()
  }

  // Form action

  const handleChangeTrackForm = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    switch (name) {
      case "trackTitle":
        setTitle(value)
        break
      case "trackArtist":
        setArtist(value)
        break
      case "publicDate":
        const date = new Date(value)
        setPublicDate(date)
        break
      case "trackPrivacy":
        const privacy = value === "true"
        setPrivacy(privacy)
        break
    }
  }

  return (
    <div className="bg-zinc-800 rounded-lg">
      <input
        type="file"
        accept="image/png,image/jpeg"
        ref={thumbnailRef}
        onChange={handleThumbnailOnChange}
        className="hidden"
      />
      <div className="bg-neutral-800 flex justify-between p-4 rounded-lg drop-shadow-lg">
        <span className="underline decoration-jarcata decoration-2 underline-offset-4">
          {file.name}
        </span>
        <button onClick={() => setActive(file.name)}>
          {active == file.name ? <BsDashLg size={24} /> : <BsPlus size={24} />}
        </button>
      </div>
      {active == file.name && (
        <div className="p-4 flex relative">
          <div className="relative group w-48">
            <img
              src={preview}
              className="w-full aspect-square object-cover rounded-sm"
            />
            <div
              className="w-full aspect-square absolute top-0 bg-black/50 hidden group-hover:flex flex-col items-center justify-center underline"
              onClick={handleChangeOnClick}
            >
              <BsPencilFill size={48} />
              Change thumbnail
            </div>
          </div>
          {/* Track Information Form */}
          <div className="grid grid-cols-2 h-fit gap-2 p-2 flex-grow">
            <label htmlFor="trackArtist" className="flex flex-col h-fit">
              Artist:
              <input
                type="text"
                name="trackArtist"
                className="p-2 bg-white/5 rounded focus:outline-0"
                onChange={handleChangeTrackForm}
                placeholder="Enter artist name"
              />
            </label>
            <label htmlFor="trackTitle" className="flex flex-col h-fit">
              Title:
              <input
                type="text"
                name="trackTitle"
                className="p-2 bg-white/5 rounded focus:outline-0"
                onChange={handleChangeTrackForm}
                placeholder="Enter track title"
              />
            </label>
            <label htmlFor="publicDate" className="flex flex-col h-fit">
              Release date:
              <input
                type="text"
                name="publicDate"
                className="p-2 bg-white/5 rounded focus:outline-0"
                onChange={handleChangeTrackForm}
                placeholder="MM-DD-YYYY"
              />
            </label>
            <label htmlFor="trackPrivacy" className="flex flex-col h-fit">
              Public:
              <select
                defaultValue={privacy.toString()}
                name="trackPrivacy"
                className="p-2 appearance-none bg-[#323235] rounded focus:outline-0"
                onChange={handleChangeTrackForm}
              >
                <option value={"true"}>Yes</option>
                <option value={"false"}>No</option>
              </select>
            </label>
          </div>
          {/* Submit/Cancel button */}
          <div className="absolute flex gap-2 bottom-2 right-2">
            <button
              className="text-linkwater/50 font-bold text-xs"
              onClick={onCancel}
              id="trackPrivacy"
              name="trackPrivacy"
            >
              Cancel
            </button>
            <Primary onClick={() => {}}>
              <div className="w-16 py-2">Save</div>
            </Primary>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrackAccordion
