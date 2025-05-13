import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { createAIHooks } from "@aws-amplify/ui-react-ai";

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

// Diagnostic function to log AI configuration details
export async function logAIConfig() {
  try {
    // Get auth session to check authentication status
    const authSession = await fetchAuthSession();
    const isSignedIn = authSession?.tokens?.accessToken ? true : false;
    
    // Log diagnostic information
    console.info('🔍 AI Diagnostics', {
      isSignedIn,
      sessionValid: isSignedIn,
      clientStatus: client !== undefined ? 'Initialized' : 'Not initialized',
      hooksAvailable: typeof useAIConversation === 'function' ? 'Available' : 'Not available',
      localStorage: Object.keys(localStorage || {}).filter(k => k.includes('amplify')),
      sessionStorage: Object.keys(sessionStorage || {}).filter(k => k.includes('amplify')),
    });
    
    // Try to use the client directly to test if it works
    try {
      const convos = await client.conversations.chat.list();
      console.info('🗣️ Conversations retrieved successfully', { count: convos?.data?.length || 0 });
      return true;
    } catch (error) {
      console.error('❌ Error retrieving conversations', error);
      return false;
    }
  } catch (err) {
    console.error('❌ AI config diagnostic error:', err);
    return false;
  }
}
