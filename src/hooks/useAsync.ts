import { UseQueryOptions, useQuery } from "react-query";
import { AxiosBuilder } from "../service/apiCall";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJleHAiOjE3OTA3MDg0ODAsInVzZXJJZCI6ImIyNzlhMzNmLTE2NjEtNGZjZS1iYmJjLTg2OTlhNTllYjAzNiIsImlhdCI6MTY4MDcwNzA0NiwiZW1haWwiOiJ0ZXN0NEBnbWFpbC5jb20ifQ.-TTvV0macYshJ2X_KsXer-ZhXdBJtmZT4zfHL-fjzgk"

export default function useAsync<T>(cbFunc: () => Promise<T>, options?: UseQueryOptions<T>) {
    const query = useQuery<T>({
        queryKey: typeof cbFunc, queryFn: cbFunc, ...options
    })
    return { ...query }
}

export type ConversationType = {
    "conversationId": string,
    "name": string,
    "creator": string | null,
    "isGroup": boolean,
    "avatar": string,
    "createdAt": string,
    "lastMessage": string,
    "lastMessageAt": string,
    "isLastMessageSeen": boolean,
    "status": "offline" | "online",
    "totalUnreadMessages": number,
    "participants":
    {
        "userId": string,
        "fullName": string,
        "createdAt": string
    }
}
export const getAllConversations = async () => {
    const res = await new AxiosBuilder<ConversationType[]>("GET", {
        headers: {
            "Authorization": `Bearer ${ACCESS_TOKEN}`
        },
        url: "localhost:6101/conversations/fee3e911-4060-47bc-9649-5cfb83961b0c"
    }).call()
    return res.data
}