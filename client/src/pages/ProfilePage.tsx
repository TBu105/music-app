import { BsThreeDots } from "react-icons/bs"
import ProfileBanner from "../components/Profile/ProfileBanner"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import TrackCard from "../components/Card/TrackCard"
import { useEffect } from "react"
import { getUserUpload } from "../features/track/trackSlice"

const ProfilePage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const userUploads = useAppSelector((state) => state.track.trackByUser)
  useEffect(() => {
    dispatch(getUserUpload(id as string))
  }, [])

  return (
    <>
      <ProfileBanner />
      <div className="mx-9 my-4">
        <button>
          <BsThreeDots size={32} />
        </button>
        <div className="my-2 flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">Your uploads</h3>
          <div className="grid grid-cols-7 gap-2">
            {userUploads
              .slice(0, 7)
              .reverse()
              .map((track) => (
                <TrackCard track={track} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
