import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { BsSoundwave } from "react-icons/bs"
import TrackAccordion from "../Accordions/TrackAccordion"

type Props = {}

const UploadTab = (props: Props) => {
  const [uploadOption, setUploadOption] = useState("collective")
  const [privacyOption, setPrivacyOption] = useState("public")
  const [files, setFiles] = useState<File[]>([])
  const [active, setActive] = useState("")
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: File) => {
      setFiles((oldFiles) => {
        return [...oldFiles, file]
      })
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    console.log(files)
  }, [files])

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOption = e.target.value
    setUploadOption(newOption)
  }
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOption = e.target.value
    setPrivacyOption(newOption)
  }
  return (
    <div className="flex flex-col gap-2">
      {files.length > 0 ? (
        <>
          {uploadOption == "separates" &&
            files.map((file, index) => (
              <TrackAccordion
                key={index}
                file={file}
                active={active}
                setActive={(index: string) => {
                  setActive(index)
                }}
              />
            ))}
          {uploadOption == "collective" && "many"}
        </>
      ) : (
        <>
          <div className="flex gap-2 text-lg font-semibold">
            Files are uploaded as:
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                className="form-radio text-red-500"
                value={"collective"}
                checked={uploadOption === "collective"}
                onChange={handleOptionChange}
              />
              <span>Collective</span>
              <input
                type="radio"
                value={"separates"}
                checked={uploadOption === "separates"}
                onChange={handleOptionChange}
              />
              <span>Separates</span>
            </div>
          </div>
          <div className="flex gap-2 text-lg font-semibold">
            Shown as:
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                className="form-radio text-red-500"
                value={"public"}
                checked={privacyOption === "public"}
                onChange={handlePrivacyChange}
              />
              <span>Public</span>
              <input
                type="radio"
                value={"private"}
                checked={privacyOption === "private"}
                onChange={handlePrivacyChange}
              />
              <span>Private</span>
            </div>
          </div>
          <div className="flex w-full py-56 bg-neutral-800 rounded items-center justify-center">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="flex flex-col items-center text-neutral-700">
                  <BsSoundwave size={96} />
                  <p className="text-linkwater text-xl font-bold">
                    Drop thems here
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-neutral-700">
                  <BsSoundwave size={96} />
                  <p className="text-linkwater text-xl font-bold">
                    Drag and drop your tracks here
                  </p>
                  <p className="text-linkwater/50 underline">
                    or click here to choose files
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UploadTab
