import { useState, useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { getCurrentUser } from "aws-amplify/auth";
import styles from "./Login.module.css";

export default function Login() {
  const { route, signOut, user, authStatus } = useAuthenticator((ctx) => [
    ctx.route,
    ctx.user,
    ctx.authStatus,
  ]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPersisted, setIsPersisted] = useState(false);

  // Check for persisted auth state on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        await getCurrentUser();
        setIsPersisted(true);
      } catch (error) {
        setIsPersisted(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  // Handle auth state changes
  useEffect(() => {
    if (authStatus !== "configuring") {
      setIsLoading(false);
      if (route === "authenticated" && user) {
        console.log("Authenticated user:", user);
        setIsPersisted(true);
      }
    }
  }, [authStatus, route, user]);

  useEffect(() => {
    if (route === "authenticated") {
      setShow(false);
    }
  }, [route]);

  // Consider authenticated if either actively authenticated or has persisted session
  const isAuthenticated =
    (authStatus !== "configuring" && route === "authenticated") || isPersisted;

  const handleClick = () => {
    if (isAuthenticated) {
      signOut();
      setIsPersisted(false);
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <div
        className={`${styles.sign} ${isAuthenticated ? styles.logout : ""} ${
          isLoading ? styles.loading : ""
        }`}
        onClick={!isLoading ? handleClick : undefined}
      >
        {isLoading ? "..." : isAuthenticated ? "Logout" : "Login"}
      </div>
      {/* Only show login modal if explicitly not authenticated and modal should show */}
      {!isLoading && !isAuthenticated && show && (
        <div className={styles.overlay} onClick={() => setShow(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <Authenticator hideSignUp={false} signUpAttributes={["nickname"]} />
          </div>
        </div>
      )}
    </>
  );
}
