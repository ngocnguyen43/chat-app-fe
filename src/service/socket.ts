import { io } from 'socket.io-client';

import { env } from '../config';

// const URL =
//   process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:6101'
export const socket = io(`${env.SOCKET_URL}`, {
  autoConnect: false,
  extraHeaders: {
    'x-date': Math.round(new Date().getTime() / 1000).toString(),
  },
  transports: ['websocket'],
});
socket.onAny((event, ...args) => {
  console.log(event, args);
});
