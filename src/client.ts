import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { createAIHooks } from "@aws-amplify/ui-react-ai";
import config from "../amplify_outputs.json";

// Configure Amplify with the configuration from amplify_outputs.json
// This file should be generated properly by the CI/CD pipeline in Amplify
Amplify.configure(config);

/**
 * Amplify Data client for CRUD and AI routes
 */
export const client = generateClient<Schema>({
  authMode: "userPool"
});

/**
 * React hooks for AI conversation and generation with error handling
 */
export const { useAIConversation, useAIGeneration } = createAIHooks(client);

// Add this helper function to clear a conversation
export async function clearConversation(conversationId?: string) {
  try {
    if (conversationId) {
      await client.conversations.chat.delete({ id: conversationId });
    }
    // Explicitly remove the cached conversation
    localStorage.removeItem("amplify-ai-conversation-chat");
  } catch (err) {
    console.error("Failed to clear conversation:", err);
  }
}

export async function refreshCompleteAuth() {
  try {
    // Force a complete auth token refresh
    await fetchAuthSession({ forceRefresh: true });
    const user = await getCurrentUser();
    console.log("Auth refreshed, user:", user);
    
    // Clear ALL conversation storage
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (key.includes("amplify-ai-conversation")) {
        localStorage.removeItem(key);
      }
    }
    
    // Also try session storage
    const sessionKeys = Object.keys(sessionStorage || {});
    for (const key of sessionKeys) {
      if (key.includes("amplify-ai-conversation")) {
        sessionStorage.removeItem(key);
      }
    }
    
    return true;
  } catch (err) {
    console.error("Auth refresh failed:", err);
    return false;
  }
}
