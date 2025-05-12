import TraidarLogo from "../../../../../assets/IMG/favicon/favicon-32x32.png";
import { Avatar } from "@aws-amplify/ui-react";
import { AIConversation, createAIHooks, SendMessage } from "@aws-amplify/ui-react-ai";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../../../../amplify/data/resource";
import styles from "./TraidarAI.module.css";
import { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";

const client = generateClient<Schema>();
const { useAIConversation } = createAIHooks(client);

function TraidarAI() {
  const [error, setError] = useState<Error | null>(null);
  const [userName, setUserName] = useState<string>("User");
  const [userPicture, setUserPicture] = useState<string | null>(null);
  const [{ data: { messages }, isLoading }, handleSendMessage] = useAIConversation("chat");

  useEffect(() => {
    async function initializeChat() {
      try {
        const attributes = await fetchUserAttributes();
        if (attributes.email) {
          setUserName(attributes.email);
        }
        if (attributes.picture) {
          setUserPicture(attributes.picture);
        }
      } catch (error) {
        setError(error as Error);
      }
    }

    initializeChat();
  }, []);

  const handleImageError = () => {
    setUserPicture(null);
  };

  const wrappedHandleSendMessage: SendMessage = async (input) => {
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

  return (
    <div className={styles.chatContainer}>
      <AIConversation
        welcomeMessage="Hi, I'm Pip, your personal trading assistant. How can I help you today?"
        messages={messages}
        isLoading={isLoading}
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
