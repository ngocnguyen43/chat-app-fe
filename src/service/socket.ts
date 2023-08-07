import { io } from 'socket.io-client';

const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:6101'
export const socket = io('http://localhost:6101', { autoConnect: false })
socket.onAny((event, ...args) => {
  console.log(event, args)
})
