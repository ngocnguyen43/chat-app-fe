import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Messages } from '../@types';
import { env } from "../config";

export const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.BACK_END_URL}/conversation/` }),
    tagTypes: ['Messages'],
    endpoints: (builder) => ({
        getMessages: builder.query<Messages, { id: string, lai: string }>({
            query: ({ id, lai }) => `${id}?lai=${lai}`,
            providesTags: (result) => result ? [
                { type: 'Messages' as const, id: result.conversationId, lai: result.messages.at(-1)?.messageId }] : [{ type: 'Messages' as const, id: "" }],
            // Only have one cache entry because the arg always maps to one string
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                if (currentCache.conversationId === newItems.conversationId) {
                    currentCache.messages.push(...newItems.messages);
                }

            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.id !== previousArg?.id;
            }
        })
    })
});
export const { useGetMessagesQuery } = messageApi;
