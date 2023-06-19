import { useAppSelector } from "../app/hooks"

const Homepage = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser?.id)
  return <div>{currentUser}</div>
}

export default Homepage
