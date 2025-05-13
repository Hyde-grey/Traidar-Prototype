import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@aws-amplify/ui-react/styles.css";
import "./styles/index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import config from "../amplify_outputs.json";
import { logAIConfigDetails } from "./client";

// Configure Amplify with the outputs file from the sandbox
Amplify.configure(config);

// Log configuration details to help with debugging
console.info("✅ Amplify configured successfully");

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
