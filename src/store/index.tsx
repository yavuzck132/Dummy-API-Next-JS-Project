import { createContext, useContext, ReactNode, Dispatch, SetStateAction, useState, FC } from 'react';

type ContextType = {
  userPage: number;
  setUserPage: Dispatch<SetStateAction<number>>;
  postPage: number;
  setPostPage: Dispatch<SetStateAction<number>>;
};

const PageContext = createContext<ContextType | undefined>(undefined);

type ContextProviderProps = {
  children: ReactNode;
};

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [userPage, setUserPage] = useState<number>(0);
  const [postPage, setPostPage] = useState<number>(0);


  const contextValue: ContextType = {
    userPage,
    setUserPage,
    postPage,
    setPostPage,
  };

  return <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>;
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within an ContextProvider');
  }
  return context;
};