import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@aws-amplify/ui-react/styles.css";
import "./styles/index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import config from "../amplify_outputs.json";

// Configure Amplify with proper type structure that matches Gen 2 config
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: config?.auth?.user_pool_id || "",
      userPoolClientId: config?.auth?.user_pool_client_id || "",
      identityPoolId: config?.auth?.identity_pool_id || "",
      loginWith: {
        email: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: config?.data?.url || "",
      region: config?.data?.aws_region || "eu-west-2",
      apiKey: config?.data?.api_key || "",
      defaultAuthMode: "userPool",
    },
  },
} as const);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </StrictMode>
);
