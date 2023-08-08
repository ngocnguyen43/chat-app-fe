import useAxios from "./useAxios";
import { useMutation } from "react-query";
type Message = {
    conversation: string,
    sender: string,
    type: "text",
    time: number,
    content: string,
}
export function useCreateMessage() {
    const { axios } = useAxios()
    return useMutation({
        mutationFn: async (data: Message) => {
            return axios.post("http://localhost:6101/message", data)
        },
        onSuccess: (data) => {
            console.log(data)
        },
    })
}