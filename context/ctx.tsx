import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from 'react';
import { useStorageState } from '~/lib/useStorageState';
import { signIn as apiSignIn, signOut as apiSignOut } from './api/auth';

const AuthContext = createContext<
  | {
      signIn: (
        branch: string,
        username: string,
        password: string,
      ) => Promise<void>;
      signOut: () => void;
      session?: string | null;
      isLoading: boolean;
    }
  | undefined
>(undefined);

export function useSession() {
  const value = useContext(AuthContext);
  if (value === undefined) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[storageLoading, session], setSession] = useStorageState('session');
  const [signInLoading, setSignInLoading] = useState(false);

  const handleSignIn = async (
    branch: string,
    username: string,
    password: string,
  ) => {
    setSignInLoading(true);
    try {
      const { token } = await apiSignIn({ branch, username, password });
      setSession(token);
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignOut = async () => {
    await apiSignOut({ token: session });
    setSession(null);
  };

  // const handleSignInDump = async (username: string, password: string) => {
  //   // const { token } = await apiSignIn({ branch, username, password });
  //   // setSession(token); // store token
  //   setSignInLoading(true);
  //   try {
  //     const response = await signInAuthDump({ username, password });
  //     setSession(response.accessToken);
  //   } finally {
  //     setSignInLoading(false);
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signOut: handleSignOut,
        session,
        isLoading: storageLoading || signInLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
