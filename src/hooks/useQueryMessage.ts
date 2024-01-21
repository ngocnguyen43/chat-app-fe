// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import useAxios from './useAxios';
// import { env } from '../config';

// type Message = {
//     "id": string,
//     "conversation": string
//     "time": string
//     "message": {
//         "type": "text" | "image" | "video",
//         "content": string
//     }[],
//     "sender": string
// }
// export function useQueryMessage() {

//     const queryClient = useQueryClient()
//     return [({userId,currentConversation,})=> queryClient.setQueryData(["get-messages", currentConversation], (oldData: MessageQueryType) => {
//         const [first, ...rest] = oldData.pages
//         const messagesData = [{
//             messageId,
//             message: data,
//             sender: userId,
//             recipients: [],
//             isDeleted: false,
//             createdAt: Date.now().toString(),
//             group: getCurrentUnixTimestamp(),
//         }, ...first.messages]

//         return {
//             ...oldData,
//             pages: [{
//                 ...first,
//                 messages: [...messagesData]
//             }, ...rest]
//         }
//     })]
//     // return useMutation({
//     //     mutationFn: async (data: Message) => {
//     //         return axios.post(`${env.BACK_END_URL}/message`, data)
//     //     },
//     //     onSuccess: (data) => {
//     //         console.log(data)
//     //     },
//     // })
// }
