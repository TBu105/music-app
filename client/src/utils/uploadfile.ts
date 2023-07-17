import axios from "axios"

const api = axios.create({
  baseURL: "/api/v1",
})

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append("file", file)
    const response = await api.post("/fileupload/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data.fileURL
  } catch (error: any) {
    throw Error(`Error: ${error.response.data.message}`)
  }
}
