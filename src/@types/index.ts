export interface ISingleMessage extends React.PropsWithChildren {
  message: {
    type: 'text' | 'location' | 'image' | 'file' | 'video' | 'link';
    content: string;
  }[];
  id: string;
  sender: string | undefined;
  avatar: string | undefined;
  shouldShowAvatar: boolean;
  isDelete: boolean;
}

export interface IBoucingMesssageBox {
  handleClickBouncing: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type MessageRef = HTMLDivElement;

export type ConversationType = {
  conversationId: string;
  name: string;
  creator: string | null;
  isGroup: boolean;
  avatar: string;
  createdAt: string;
  lastMessage: string;
  lastMessageAt: string;
  isLastMessageSeen: boolean;
  status: 'offline' | 'online';
  totalUnreadMessages: number;
  participants: {
    id: string;
  }[];
};

export type ContactType = {
  userId: string;
  fullName: string;
  avatar: string;
  status: 'online' | 'offline';
  lastLogin: string;
  conversationId: string;
};

export type Messages = {
  conversationId: string;
  messages: {
    messageId: string;
    message: {
      type: 'text' | 'location' | 'image' | 'file' | 'video' | 'link';
      content: string;
    }[];
    sender?: string;
    recipients: string[];
    isDeleted: boolean;
    createdAt: string;
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
export interface LoginResponse {
  id: string;
  email: string;
  full_name: string;
  user_name: string;
  access_token: string;
}