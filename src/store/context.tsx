import { createContext, PropsWithChildren, useRef, useState } from 'react';

import Dialog from '../components/atoms/Dialog';

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

type DialogContextStateType = {
  isOpen: boolean;
  description: string;
  buttonLabel: string;
};
export type DialogContextType = {
  (data: DialogContextStateType): Promise<boolean>;
};
export const DialogContext = createContext({} as DialogContextType);

export const DialogProvider = ({ children }: PropsWithChildren) => {

  const [state, setState] = useState<PartialBy<DialogContextStateType, 'buttonLabel' | 'description'>>({
    isOpen: false,
  });
  const fn = useRef<(choice: boolean) => void>();
  const confirm = (data: DialogContextStateType) => {
    return new Promise<boolean>((resolve) => {
      setState({ ...data, isOpen: true });
      fn.current = (choice) => {
        resolve(choice);
        setState({ isOpen: false });
      };
    });
  };

  return (
    <DialogContext.Provider value={confirm}>
      {children}
      <Dialog {...state} onClose={() => fn.current!(false)} onConfirm={() => fn.current!(true)} />
    </DialogContext.Provider>
  );
};
