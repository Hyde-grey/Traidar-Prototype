import { useAIConversation } from "../../../../../client";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import styles from "./TraidarAI.module.css";

const TraidarAI = () => {
  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation("chat");

  return (
    <div className={styles.chatContainer}>
      <AIConversation
        messages={messages}
        isLoading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default TraidarAI;
