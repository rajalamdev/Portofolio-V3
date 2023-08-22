import { getNowPlaying } from "@/lib/spotify"
import Layout from "../components/layout/Layout"

const getNowPlayingSpotify = async () => {
  const res = await fetch("http://localhost:3000/api/now-playing")
  return await res.json()

}

const Blog = async () => {
  const getRes = await getNowPlayingSpotify();
  console.log(getRes)

  return (
    <div></div>
  )
}

export default Blog