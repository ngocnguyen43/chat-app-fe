export interface ISingleMessage extends React.PropsWithChildren {
  message:
    | {
        type: 'text' | 'image' | 'file' | 'video' | 'link' | 'audio';
        content: string;
      }[]
    | { type: 'coordinate'; content: { lat: string; long: string } }[];
  id: string;
  sender: string | undefined;
  avatar: string | undefined;
  shouldShowAvatar: boolean;
  reactions: number;
  isDelete: boolean;
  index: number;
}

export interface IBoucingMesssageBox {
  handleClickBouncing: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type MessageRef = HTMLDivElement;

export type ConversationType = {
  conversationId: string;
  name: string;
  creator: string | null;
  isGroup: boolean | undefined;
  createdAt: string;
  lastMessage: string;
  lastMessageAt: string;
  isLastMessageSeen: boolean;
  status: 'offline' | 'online';
  totalUnreadMessages: number;
  participants: {
    id: string;
    avatar: string;
    fullName: string;
    isActive: boolean;
  }[];
  state:
    | {
        isBlocked: boolean;
        type: 'user' | 'blocker';
      }
    | undefined;
};

export type ContactType = {
  userId: string;
  fullName: string;
  avatar: string;
  status: 'online' | 'offline';
  lastLogin: string;
  conversationId: string;
  state: {
    isBlocked: boolean;
    type: 'user' | 'blocker';
  };
};

export type Messages = {
  conversationId: string;
  messages: {
    messageId: string;
    message:
      | {
          type: 'text' | 'image' | 'file' | 'video' | 'link' | 'audio';
          content: string;
        }[]
      | { type: 'coordinate'; content: { lat: string; long: string } }[];
    sender?: string;
    recipients: string[];
    isDeleted: boolean;
    createdAt: string;
    _count: {
      MessageReaction: number;
    };
    group: string;
  }[];
  hasNextPage: boolean;
};

export type URLMetadata = {
  title: string;
  description: string;
  images: string[];
  duration: number;
  domain: string;
  url: string;
};

export type PeerIdsResponse = {
  id: string;
};

export type ACType = {
  accessToken: string;
  url: string;
};
export interface AuthFormProps {
  mode?: 'signin' | 'signup' | 'password' | 'options';
}
export interface LoginResponse {}
type MessageContentType =
  | {
      type: 'text' | 'image' | 'file' | 'video' | 'link' | 'audio';
      content: string;
    }[]
  | { type: 'coordinate'; content: { lat: string; long: string } }[];
export type MessageType = {
  messageId: string;
  message: MessageContentType;
  sender?: string;
  recipients: string[];
  isDeleted: boolean;
  createdAt: string;
  _count: {
    MessageReaction: number;
  };
  group: string;
};

export type PageType = {
  conversationId: string;
  messages: MessageType[];
  hasNextPage: boolean;
};

export type MessageQueryType = {
  pages: PageType[] | [];
  pageParams: string[] | [];
};

export type MessageDataType = {
  message: { type: 'text' | 'image'; content: string }[];
  lastMessage: string;
};
