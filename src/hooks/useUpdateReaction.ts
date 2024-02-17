import { MessageQueryType } from "../@types";
import { queryClient } from "../service"
import { socket } from "../service/socket";
import { delay } from "../utils";
import { useAppSelector } from "./useAppSelector";

export default function useUpdateReaction() {
    const { id: conversationId } = useAppSelector(state => state.currentConversation)
    const { entity: { userId } } = useAppSelector(state => state.information)
    return async (action: "create" | "remove", messageId: string, withEmitEvent = true) => {
        await delay(600)
        queryClient.setQueryData(['get-messages', conversationId], (data: MessageQueryType | undefined) => {
            if (data) {
                const newData = data.pages.map((entity) => {
                    const updatedMessage = entity.messages.map((msg) => {
                        if (messageId === msg.messageId) {

                            return {
                                ...msg,
                                _count: {
                                    MessageReaction: action === "create" ? 1 : 0
                                },
                            };
                        } else {
                            return msg;
                        }
                    });
                    return {
                        ...entity,
                        messages: updatedMessage,
                    };
                });
                return {
                    ...data,
                    pages: newData,
                };
            }
        });
        if (withEmitEvent) {
            socket.emit("create remove reaction", { action, userId, messageId, conversationId })
        }
    }
}