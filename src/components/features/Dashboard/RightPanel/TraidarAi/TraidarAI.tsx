import TraidarLogo from "../../../../../assets/IMG/favicon/favicon-32x32.png";
import { Avatar } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { AIConversation, createAIHooks } from "@aws-amplify/ui-react-ai";
import outputs from "../../../../../../amplify_outputs.json";
import type { Schema } from "../../../../../../amplify/data/resource";
import styles from "./TraidarAI.module.css";
import { useUser } from "../../../../../context/UserContext";

Amplify.configure(outputs);
const client = generateClient<Schema>({ authMode: "userPool" });
const { useAIConversation } = createAIHooks(client);

function TraidarAI() {
  const { userName, userPicture, isAuthenticated } = useUser();

  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation("chat");

  const handleImageError = () => {
    // Handle avatar image loading error
  };

  if (isLoading) {
    return (
      <div className={styles.chatContainer}>
        <div className={styles.loadingMessage}>
          Loading chat...
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
        {/* Removed manual reset; use built-in conversation hook */}
      </div>

      <AIConversation
        messages={messages}
        isLoading={isLoading}
        handleSendMessage={handleSendMessage}
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
