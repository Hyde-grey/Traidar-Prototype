import { generateClient } from "aws-amplify/api";
import type { Schema } from "../amplify/data/resource";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { createAIHooks } from "@aws-amplify/ui-react-ai";
import { Amplify } from "aws-amplify";

// Note: Amplify is already configured in main.tsx
// We're not reconfiguring it here to avoid overriding previous configurations

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

/**
 * Clear a conversation by ID or the current conversation
 * @param conversationId Optional ID of conversation to clear
 * @returns Promise that resolves when conversation is cleared
 */
export async function clearConversation(conversationId?: string) {
  try {
    if (conversationId) {
      await client.conversations.chat.delete({ id: conversationId });
      console.info(`✅ Deleted conversation: ${conversationId}`);
    }
    
    // Explicitly remove the cached conversation
    localStorage.removeItem("amplify-ai-conversation-chat");
    console.info("🧹 Cleared conversation from local storage");
    
    return true;
  } catch (err) {
    console.error("❌ Failed to clear conversation:", err);
    return false;
  }
}

/**
 * Refresh authentication and clear conversation data
 * @returns Promise<boolean> indicating success
 */
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

/**
 * Log detailed AI configuration for debugging
 * @returns Promise<boolean> indicating success
 */
export async function logAIConfigDetails() {
  try {
    // Log full Amplify configuration for debugging
    const fullConfig = Amplify.getConfig() as any;
    console.info('🔍 AI Configuration Details:', {
      aiRegion: fullConfig.ai?.region || 'not configured',
      conversationConfig: fullConfig.ai?.conversation || 'not configured',
      authStatus: 'Checking...'
    });
    
    const authSession = await fetchAuthSession();
    console.info('🔍 Authentication status:', !!authSession.tokens);
    return true;
  } catch (err) {
    console.error('❌ AI Config Diagnostic Error:', err);
    return false;
  }
}

/**
 * Validate a trading symbol format
 * @param symbol The trading symbol to validate
 * @returns boolean indicating if the symbol is valid
 */
export function isValidSymbol(symbol: string): boolean {
  if (!symbol) return false;
  
  // Basic validation for common crypto and stock symbols
  // Crypto typically uses patterns like BTCUSDT, stocks like AAPL
  return /^[A-Z0-9]{2,12}$/.test(symbol);
}