import { createContext, PropsWithChildren, useState } from 'react';

export type AuthStageState = {
  stage: 0 | 1 | 2 | 3;
  setStage: (number: 1 | 2 | 3) => void;
};
export const AuthStageContext = createContext({} as AuthStageState);

export const AuthStageProvider = ({ children }: PropsWithChildren) => {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const value = {
    stage,
    setStage,
  };
  return <AuthStageContext.Provider value={value}>{children}</AuthStageContext.Provider>;
};
type UserInitialState = {
  user: string | null;
  setUser: (email: string) => void;
};
export const UserContext = createContext({} as UserInitialState);
export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<string | null>(null);
  const value = {
    user,
    setUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
