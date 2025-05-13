import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@aws-amplify/ui-react/styles.css";
import "./styles/index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import config from "../amplify_outputs.json";
import { logAIConfigDetails } from "./client";

// Convert from new format to Amplify Gen 2 format
const amplifyConfig = {
  Auth: {
    region: config.auth.aws_region,
    Cognito: {
      userPoolId: config.auth.user_pool_id,
      userPoolClientId: config.auth.user_pool_client_id,
      identityPoolId: config.auth.identity_pool_id,
      loginWith: {
        email: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: config.data.url,
      region: config.data.aws_region,
      apiKey: config.data.api_key,
      defaultAuthMode: "AMAZON_COGNITO_USER_POOLS",
    },
  },
  ai: {
    region: config.data.aws_region,
    conversation: {
      chat: {
        model: "anthropic.claude-3-haiku-20240307-v1:0",
        provider: "bedrock",
        region: config.data.aws_region,
      },
    },
  },
};

// Configure Amplify just once at the root level
try {
  Amplify.configure(amplifyConfig as any);
  console.info("✅ Amplify configured successfully");
} catch (error) {
  console.error("❌ Failed to configure Amplify:", error);
}

// Log configuration details to help with debugging
console.info("🚀 Amplify Configuration:", {
  hasAuth: !!amplifyConfig.Auth,
  hasCognito: !!amplifyConfig.Auth?.Cognito,
  hasLoginWith: !!amplifyConfig.Auth?.Cognito?.loginWith,
  hasAPI: !!amplifyConfig.API,
  hasAI: !!amplifyConfig.ai,
});

// Initialize app after configuration
setTimeout(() => {
  logAIConfigDetails().catch((err) =>
    console.error("Failed to log AI config details:", err)
  );
}, 1000);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </StrictMode>
);
