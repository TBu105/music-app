import axios from "axios"

const API_KEY = import.meta.env.VITE_MUSIXMATCH_API_KEY
const BASE_URL = "/proxy"

export const searchTracks = async (q_track: string, q_artist: string) => {
  if (!API_KEY) console.error("Error: can't find API key")
  try {
    const response = await axios.get(`${BASE_URL}/track.search`, {
      params: {
        apikey: API_KEY,
        q_track,
        q_artist,
      },
    })
    return response.data.message.body.track_list[0].track.track_id
  } catch (error) {
    console.error("Error fetching data from Musixmatch API:", error)
    return null
  }
}
export const getLyrics = async (track_id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/track.lyrics.get`, {
      params: {
        apikey: API_KEY,
        track_id,
      },
    })
    if (response.data.message.body.length == 0) return null

    return response.data.message.body.lyrics.lyrics_body
  } catch (error) {
    return null
  }
}
