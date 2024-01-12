import { useMutation } from "@tanstack/react-query"
import useAxios from "./useAxios"

export const useUploadFile = () => {
    const { axios } = useAxios()
    return useMutation({
        mutationFn: (data: { file: File, id: string, conversation: string, sender: string, type: "image" | "video", time: number, content: string }) => {
            const formData = new FormData()
            formData.append("file", data.file);
            formData.append("id", data.id)
            formData.append("conversation", data.conversation)
            formData.append("sender", data.sender)
            formData.append("type", data.type)
            formData.append("time", data.time.toString())
            formData.append("content", data.content)
            return axios.post("http://localhost:5301/api/v1/file/avatar", formData)
        }
    })
}