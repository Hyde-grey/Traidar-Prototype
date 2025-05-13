import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { createAIHooks } from "@aws-amplify/ui-react-ai";
import config from "../amplify_outputs.json";

// Explicitly log the config being loaded to help diagnose issues
console.log("Amplify configuration loaded:", 
  JSON.stringify({
    hasAuth: !!config?.auth,
    authRegion: config?.auth?.aws_region,
    hasUserPool: !!config?.auth?.user_pool_id
  })
);

// Configure Amplify with the sandbox config, ensuring Auth is properly set up
Amplify.configure({
  ...config as any,
  // Explicitly ensure Auth configuration is correct
  Auth: {
    Cognito: {
      userPoolId: config?.auth?.user_pool_id || "eu-west-2_Lnpv8PpZ9",
      userPoolClientId: config?.auth?.user_pool_client_id || "5gcd3psg8eku3h2u3ro2oto9n2",
      identityPoolId: config?.auth?.identity_pool_id || "eu-west-2:bb9541a9-eb31-407b-9313-6d5f119d97c6",
      loginWith: {
        email: true,
      },
    }
  }
});

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
