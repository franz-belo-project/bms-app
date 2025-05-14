import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from 'react';
import { useStorageState } from '~/lib/useStorageState';
import { useBranchPort } from '~/lib/hooks/use-branch-port';
import { signIn as apiSignIn } from './api/auth';

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
  const { selectedBranch } = useBranchPort();
  const [[storageLoading, session], setSession] = useStorageState('session');
  const [signInLoading, setSignInLoading] = useState(false);

  const handleSignIn = async (
    branch: string,
    username: string,
    password: string,
  ) => {
    setSignInLoading(true);
    try {
      const { token } = await apiSignIn(selectedBranch, {
        branch,
        username,
        password,
      });
      setSession(token);
    } finally {
      setSignInLoading(false);
    }
  };

  // if (session) {
  //   return null;
  // }

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        // signOut: handleSignOut,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading: storageLoading || signInLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
