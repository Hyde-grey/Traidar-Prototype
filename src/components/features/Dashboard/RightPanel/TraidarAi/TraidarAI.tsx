import TraidarLogo from "../../../../../assets/IMG/favicon/favicon-32x32.png";
import { Avatar } from "@aws-amplify/ui-react";
import { AIConversation, createAIHooks, SendMessage } from "@aws-amplify/ui-react-ai";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../../../../amplify/data/resource";
import styles from "./TraidarAI.module.css";
import { useEffect, useState } from "react";
import { useUser } from "../../../../../context/UserContext";
import { clearConversation } from "../../../../../client";

const client = generateClient<Schema>();
const { useAIConversation } = createAIHooks(client);

function TraidarAI() {
  const [error, setError] = useState<Error | null>(null);
  const { userName, userPicture, isAuthenticated } = useUser();
  const [{ data: { messages }, isLoading: isConversationLoading }, handleSendMessage] = useAIConversation("chat");

  // Clear conversation when user signs out
  useEffect(() => {
    if (!isAuthenticated) {
      clearConversation();
    }
  }, [isAuthenticated]);

  const handleImageError = () => {
    // Avatar will fall back to initials
  };

  const wrappedHandleSendMessage: SendMessage = async (input) => {
    if (!isAuthenticated) {
      setError(new Error("Please sign in to use the chat"));
      return;
    }

    try {
      const formattedInput = {
        content: Array.isArray(input.content) ? input.content : [input.content],
        aiContext: input.aiContext,
        toolConfiguration: input.toolConfiguration
      };
      return await handleSendMessage(formattedInput);
    } catch (error) {
      setError(error as Error);
      throw error;
    }
  };

  if (error) {
    return (
      <div className={styles.chatContainer}>
        <div className="error-message">
          Error: {error.message}. Please try refreshing the page.
        </div>
      </div>
    );
  }

  if (isConversationLoading) {
    return (
      <div className={styles.chatContainer}>
        <div className="loading-message">
          Loading chat...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.chatContainer}>
        <div className="info-message">
          Please sign in to use the chat feature.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chatContainer}>
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
            username: "Pip"
          }
        }}
      />
    </div>
  );
}

export default TraidarAI;
