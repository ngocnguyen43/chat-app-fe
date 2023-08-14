import { Message } from '../hooks/useFetchMessage';

export function unixTimestampToDateWithHour(unixTimestamp: number) {
  const dateObj = new Date(unixTimestamp * 1000)
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  const hours = String(dateObj.getHours()).padStart(2, '0')

  return `${year}-${month}-${day}-${hours}`
}
export function formatTime(unixTimestamp: number) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dateObj = new Date(unixTimestamp * 1000)
  const dayOfWeek = daysOfWeek[dateObj.getDay()]
  const hours = dateObj.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12
  return `${dayOfWeek}, ${formattedHour === 12 && ampm === 'AM' ? 0 : formattedHour
    } ${ampm}`
}
export function formatAgo(unixTimestamp: number) {
  const currentTime = Math.floor(Date.now() / 1000)
  const timeDifference = currentTime - unixTimestamp

  if (timeDifference < 60) {
    return `${timeDifference}s`
  } else if (timeDifference < 3600) {
    const minutesAgo = Math.floor(timeDifference / 60)
    return `${minutesAgo}m`
  } else if (timeDifference < 86400) {
    const hoursAgo = Math.floor(timeDifference / 3600)
    return `${hoursAgo}h`
  } else {
    const daysAgo = Math.floor(timeDifference / 86400)
    return `${daysAgo}d`
  }
}
export function formatConversationStatus(unixTimestamp: number) {
  const currentTime = Math.floor(Date.now() / 1000)
  const timeDifference = currentTime - unixTimestamp

  if (timeDifference < 60) {
    return `${timeDifference} seconds ago`
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
export function convertToDate(data: string) {
  const parts = data.split('-')
  const datePart = parts.slice(0, 3).join('-') // "2023-07-30"
  const timePart = parts[3]
  const date = new Date(datePart)
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dayOfWeek = weekdayNames[date.getDay()]
  const ampm = +timePart >= 12 ? 'PM' : 'AM'
  return `${dayOfWeek}, ${+timePart === 12 && ampm === 'AM' ? 0 : timePart
    } ${ampm}`
}
export const groupMessagesByDateTime = (messages: Message[]) => {
  const groupedMessages: Record<string, Message[]> = {}

  messages.forEach((message) => {
    const createdAt = unixTimestampToDateWithHour(+message.createdAt)
    if (!groupedMessages[createdAt]) {
      groupedMessages[createdAt] = []
    }
    groupedMessages[createdAt].push(message)
  })
  return groupedMessages
}

export const generateMessage = () => {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  const text = []
  let x = 7
  while (--x) text.push(words[Math.floor(Math.random() * words.length)])
  return text.join(' ')
}
