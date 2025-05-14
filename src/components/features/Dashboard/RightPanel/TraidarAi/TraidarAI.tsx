import TraidarLogo from "../../../../../assets/IMG/favicon/favicon-32x32.png";
import { Avatar, Button } from "@aws-amplify/ui-react";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import styles from "./TraidarAI.module.css";
import { useEffect, useState } from "react";
import { useUser } from "../../../../../context/UserContext";
import {
  clearConversation,
  logAIConfigDetails,
  useAIConversation,
} from "../../../../../client";
import { Amplify } from "aws-amplify";

// Define error types for better error handling
type AIError = {
  type: "auth" | "network" | "tool" | "unknown";
  message: string;
  details?: unknown;
};

function TraidarAI() {
  const [error, setError] = useState<AIError | null>(null);
  const { userName, userPicture, isAuthenticated } = useUser();
  const [
    { data: { messages = [] } = {}, isLoading: isConversationLoading },
    handleSendMessage,
  ] = useAIConversation("chat");
  const [isResetting, setIsResetting] = useState(false);

  // Clear conversation when user signs out
  useEffect(() => {
    if (!isAuthenticated) {
      clearConversation();
    }
  }, [isAuthenticated]);

  const handleImageError = () => {
    // Avatar will fall back to initials
  };

  // Handle starting a new conversation
  const handleNewConversation = async () => {
    try {
      setIsResetting(true);
      await clearConversation();
      // Force a refresh of the AI configuration
      await logAIConfigDetails();
      setError(null);
      setIsResetting(false);
    } catch (err) {
      console.error("Failed to reset conversation:", err);
      setError({
        type: "unknown",
        message: "Failed to start a new conversation. Please try again.",
        details: err,
      });
      setIsResetting(false);
    }
  };

  // Handle sending messages with tool configuration
  const wrappedHandleSendMessage = async (input: any) => {
    if (!isAuthenticated) {
      setError({
        type: "auth",
        message: "Please sign in to use the chat",
      });
      return;
    }

    try {
      setError(null);
      return await handleSendMessage(input);
    } catch (error) {
      console.error("AI conversation error:", error);
      setError({
        type: "unknown",
        message: "An unexpected error occurred. Please try again.",
        details: error,
      });
      throw error;
    }
  };

  if (error) {
    return (
      <div className={styles.chatContainer}>
        <div className={styles.errorMessage}>
          <h3>Error: {error.message}</h3>
          <Button onClick={handleNewConversation} isLoading={isResetting}>
            Start New Conversation
          </Button>
        </div>
      </div>
    );
  }

  if (isConversationLoading || isResetting) {
    return (
      <div className={styles.chatContainer}>
        <div className={styles.loadingMessage}>
          {isResetting ? "Starting new conversation..." : "Loading chat..."}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.chatContainer}>
        <div className={styles.infoMessage}>
          Please sign in to use the chat feature.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <Button
          size="small"
          variation="link"
          onClick={handleNewConversation}
          isLoading={isResetting}
        >
          New Conversation
        </Button>
      </div>

      <AIConversation
        welcomeMessage="Hi, I'm Pip, your personal trading assistant. How can I help you today?"
        messages={messages}
        isLoading={isConversationLoading}
        handleSendMessage={wrappedHandleSendMessage}
        avatars={{
          user: {
            avatar: (
              <Avatar
                size="small"
                src={userPicture || undefined}
                onError={handleImageError}
              >
                {!userPicture && userName[0]}
              </Avatar>
            ),
            username: userName,
          },
          ai: {
            avatar: <Avatar size="small" src={TraidarLogo} />,
            username: "Pip",
          },
        }}
      />
    </div>
  );
}

export default TraidarAI;
