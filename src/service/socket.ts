import { io } from 'socket.io-client';

const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:6101'
export const socket = io('http://localhost:6101', {
  autoConnect: false,
  extraHeaders: {
    "x-date": Math.round(new Date().getTime() / 1000).toString()
  },
  transports: ["websocket"]
})
socket.onAny((event, ...args) => {
  console.log(event, args)
})
