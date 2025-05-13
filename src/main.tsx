import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@aws-amplify/ui-react/styles.css";
import "./styles/index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import config from "../amplify_outputs.json";
import { logAIConfigDetails } from "./client";

// Configure Amplify just once at the root level
try {
  // Ensure the Auth configuration has the required loginWith property
  if (config.Auth?.Cognito && !config.Auth.Cognito.loginWith) {
    config.Auth.Cognito.loginWith = { email: true };
    console.info("📝 Added missing loginWith configuration to Auth");
  }
  
  Amplify.configure(config);
  console.info("✅ Amplify configured successfully");
} catch (error) {
  console.error("❌ Failed to configure Amplify:", error);
}

// Log configuration details to help with debugging
console.info("🚀 Amplify Configuration:", {
  version: config.version,
  hasAuth: !!config.Auth,
  hasCognito: !!config.Auth?.Cognito,
  hasLoginWith: !!config.Auth?.Cognito?.loginWith,
  hasAPI: !!config.API,
  hasAI: !!config.ai
});

// Initialize app after configuration
setTimeout(() => {
  logAIConfigDetails().catch(err => 
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