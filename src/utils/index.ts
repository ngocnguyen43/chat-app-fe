/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable n/no-callback-literal */
import clsx from 'clsx';
import { Message } from '../hooks/useFetchMessage';
export * from './map.style';
export function unixTimestampToDateWithHour(unixTimestamp: number) {
  const dateObj = new Date(unixTimestamp * 1000);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');

  return `${year}-${month}-${day}-${hours}`;
}
export function formatTime(unixTimestamp: string) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dateObj = new Date(unixTimestamp);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];

  return `${dayOfWeek}`;
}
export function formatGroupedDate(unixTimstamp: string) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(+unixTimstamp);
  const now = new Date().getFullYear();
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const formattedDate = `${month} ${day}` + (year === now ? `` : `, ${year}`);
  return `${formattedDate} `;
}
export function formatAgo(unixTimestamp: number) {

  const currentTime = Date.now();
  const timeDifference = (currentTime - unixTimestamp) / 1000;

  if (timeDifference < 60) {
    return `just now`;
  } else if (timeDifference < 3600) {
    const minutesAgo = Math.floor(timeDifference / 60);
    return `${minutesAgo} m`;
  } else if (timeDifference < 86400) {
    const hoursAgo = Math.floor(timeDifference / 3600);
    return `${hoursAgo} h`;
  } else {
    const daysAgo = Math.floor(timeDifference / 86400);
    return `${daysAgo} d`;
  }
}
export function formatConversationStatus(unixTimestamp: number) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = currentTime - unixTimestamp;

  if (timeDifference < 60) {
    return `${timeDifference} seconds ago`;
  } else if (timeDifference < 3600) {
    const minutesAgo = Math.floor(timeDifference / 60);
    return `${minutesAgo} minutes ago`;
  } else if (timeDifference < 86400) {
    const hoursAgo = Math.floor(timeDifference / 3600);
    return `${hoursAgo} hours ago`;
  } else {
    const daysAgo = Math.floor(timeDifference / 86400);
    return `${daysAgo} days ago`;
  }
}
export function convertToDate(data: string) {
  const parts = data.split('-');
  const datePart = parts.slice(0, 3).join('-'); // "2023-07-30"
  const timePart = parts[3];
  const date = new Date(datePart);
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = weekdayNames[date.getDay()];
  const ampm = +timePart >= 12 ? 'PM' : 'AM';
  return `${dayOfWeek}, ${+timePart === 12 && ampm === 'AM' ? 0 : timePart} ${ampm}`;
}
export function convertToMessageDate(time: string) {
  const date = new Date(+time);
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours().toString();
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const ampm = +hour >= 12 ? 'PM' : 'AM';
  return `${+hour === 12 && ampm === 'AM' ? 0 : hour}:${minute} ${ampm}`;
}
export const groupMessagesByDateTime = (messages: Message[]) => {
  const groupedMessages: Record<string, Message[]> = {};

  messages.forEach((message) => {
    const createdAt = unixTimestampToDateWithHour(+message.createdAt);
    if (!groupedMessages[createdAt]) {
      groupedMessages[createdAt] = [];
    }
    groupedMessages[createdAt].push(message);
  });
  return groupedMessages;
};

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
  ];
  const text = [];
  let x = 7;
  while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
  return text.join(' ');
};
export function generateRandomString(length: number) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }
  return randomString;
}

// link get meta data https://jsonlink.io/api/extract?url=[URL]
export function validURL(text: string) {
  const strs = text.split(' ');
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  let result: string | null = null;
  if (strs.length > 0) {
    strs.forEach((str) => {
      if (pattern.test(str)) {
        result = str;
      }
    });
  }
  return result;
}

export function getMimeType(file: File, callback?: (arg0: string) => void) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onloadend = function (event) {
      let mimeType = '';

      const arr = new Uint8Array(event.target?.result as ArrayBufferLike).subarray(0, 4);
      let header = '';

      for (let index = 0; index < arr.length; index++) {
        header += arr[index].toString(16);
      }
      // View other byte signature patterns here:
      // 1) https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
      // 2) https://en.wikipedia.org/wiki/List_of_file_signatures
      console.log(header);
      switch (header) {
        case '89504e47': {
          mimeType = 'image/png';
          break;
        }
        case '47494638': {
          mimeType = 'image/gif';
          break;
        }
        case '52494646':
        case '57454250':
          mimeType = 'image/webp';
          break;
        case '49492A00':
        case '4D4D002A':
          mimeType = 'image/tiff';
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          mimeType = 'image/jpeg';
          break;
        case '66747970':
          mimeType = 'video/mp4';
          break;
        default: {
          mimeType = file.type;
          break;
        }
      }
      callback && callback(mimeType);
      resolve(mimeType);
    };
    fileReader.onerror = function () {
      reject(new Error('errrr'));
    };
    fileReader.readAsArrayBuffer(file);
  });
}

interface Itext {
  time: string;
  message: { content: string; type: 'text' | 'image' | 'video' }[];
  type: 'receiver' | 'sender';
}
export function addMessageFromInput(messages: Record<string, Itext[]>, message: Itext): Record<string, Itext[]> {
  const messageTimstamp = new Date(+message.time);
  console.log(new Date(messageTimstamp.toISOString().split('T')[0]).getTime());
  const roundedDate = (new Date(messageTimstamp.toISOString().split('T')[0]).getTime() / 1000).toString();
  const res = { ...messages };
  if (res[roundedDate]) {
    res[roundedDate].push(message);
  } else {
    res[roundedDate] = [message];
  }
  return res;
}
// export const getCurrentUnixTimestamp = () => {
//   const date = new Date().toISOString().split('T')[0];
//   const group = new Date(date).getTime().toString();
//   return group
// }

/**
 * Calls all functions in the order they were chained with the same arguments.
 * @internal
 */
export function chain(...callbacks: unknown[]): (...args: unknown[]) => void {
  return (...args: unknown[]) => {
    for (const callback of callbacks) {
      if (typeof callback === 'function') {
        callback(...args);
      }
    }
  };
}

interface Props {
  [key: string]: any;
}

// taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V } ? V : never;
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, and ids are deduplicated - different ids
 * will trigger a side-effect and re-render components hooked up with `useId`.
 * For all other props, the last prop object overrides all previous ones.
 * @param args - Multiple sets of props to merge together.
 * @internal
 */
export function mergePropsReactAria<T extends Props[]>(
  ...args: T
): UnionToIntersection<TupleTypes<T>> {
  // Start with a base clone of the first argument. This is a lot faster than starting
  // with an empty object and adding properties as we go.
  const result: Props = { ...args[0] };
  for (let i = 1; i < args.length; i++) {
    const props = args[i];
    for (const key in props) {
      const a = result[key];
      const b = props[key];

      // Chain events
      if (
        typeof a === 'function' &&
        typeof b === 'function' &&
        // This is a lot faster than a regex.
        key[0] === 'o' &&
        key[1] === 'n' &&
        key.charCodeAt(2) >= /* 'A' */ 65 &&
        key.charCodeAt(2) <= /* 'Z' */ 90
      ) {
        result[key] = chain(a, b);

        // Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
      } else if (
        (key === 'className' || key === 'UNSAFE_className') &&
        typeof a === 'string' &&
        typeof b === 'string'
      ) {
        result[key] = clsx(a, b);
      } else {
        result[key] = b !== undefined ? b : a;
      }
    }
  }

  return result as UnionToIntersection<TupleTypes<T>>;
}
export function isProp<U extends HTMLElement, T extends React.HTMLAttributes<U>>(
  prop: T | undefined,
): prop is T {
  return prop !== undefined;
}
export function mergeProps<
  U extends HTMLElement,
  T extends Array<React.HTMLAttributes<U> | undefined>,
>(...props: T) {
  return mergePropsReactAria(...props.filter(isProp));
}
export const getCurrentUnixTimestamp = () => {
  const date = new Date().toLocaleDateString()
  const group = new Date(date).getTime().toString();
  return group
}