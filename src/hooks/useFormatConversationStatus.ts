import React from "react"

// "messageId": "5d367e92-7c0a-4163-a9c4-1b2afef88d1c",
// "conversationId": "d0312b62-7093-4323-9077-10b543763328",
// "type": "text",
// "content": "asasasa",
// "sender": "25de4f3b-dcff-466c-8f2e-b6a09af80198",
// "recipients": [],
// "isDeleted": false,
// "createdAt": "1691459104241"

export function useFormatConversationStatus(login: number) {

    const [now, setNow] = React.useState(new Date())
    React.useEffect((
    ) => {
        const timer = setInterval(() => {
            setNow(new Date())
        }, 1000 * 30)
        return () => {
            clearInterval(timer)
        }

    }, [])
    const currentTime = Math.floor(now.getTime() / 1000)
    const timeDifference = currentTime - login
    if (timeDifference === currentTime) {
        return ""
    }
    if (timeDifference < 60) {
        return `less than minute`
    } else if (timeDifference < 3600) {
        const minutesAgo = Math.floor(timeDifference / 60)
        return `${minutesAgo} minutes ago`
    } else if (timeDifference < 86400) {
        const hoursAgo = Math.floor(timeDifference / 3600)
        return `${hoursAgo} hours ago`
    } else {
        const daysAgo = Math.floor(timeDifference / 86400)
        return `${daysAgo} days ago`
    }
}
