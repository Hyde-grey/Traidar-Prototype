import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";

interface UserContextType {
  userName: string;
  userPicture: string | null;
  isAuthenticated: boolean;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType>({
  userName: "User",
  userPicture: null,
  isAuthenticated: false,
  clearUserData: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string>("User");
  const [userPicture, setUserPicture] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { authStatus, route } = useAuthenticator((context) => [
    context.authStatus,
    context.route,
  ]);

  const clearUserData = () => {
    setUserName("User");
    setUserPicture(null);
    setIsAuthenticated(false);
  };

  // Check for persisted auth state on mount
  useEffect(() => {
    async function checkPersistedAuth() {
      try {
        await getCurrentUser();
        const attributes = await fetchUserAttributes();
        if (attributes.email) {
          setUserName(attributes.email);
        }
        if (attributes.picture) {
          setUserPicture(attributes.picture);
        }
        setIsAuthenticated(true);
      } catch (error) {
        clearUserData();
      } finally {
        setIsLoading(false);
      }
    }
    checkPersistedAuth();
  }, []);

  // Handle auth state changes
  useEffect(() => {
    if (authStatus === "authenticated" && route === "authenticated") {
      async function checkAuth() {
        try {
          const attributes = await fetchUserAttributes();
          if (attributes.email) {
            setUserName(attributes.email);
          }
          if (attributes.picture) {
            setUserPicture(attributes.picture);
          }
          setIsAuthenticated(true);
        } catch (error) {
          clearUserData();
        }
      }
      checkAuth();
    } else if (authStatus === "unauthenticated") {
      clearUserData();
    }
  }, [authStatus, route]);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <UserContext.Provider
      value={{
        userName,
        userPicture,
        isAuthenticated,
        clearUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
