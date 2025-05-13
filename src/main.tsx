import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@aws-amplify/ui-react/styles.css";
// Remove the imports for the outputs.json file
import "./styles/index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import config from "../amplify_outputs.json";

// Configure Amplify with consistent auth configuration
Amplify.configure({
  ...(config as any),
  // Explicitly ensure Auth configuration is correct
  Auth: {
    Cognito: {
      userPoolId: config?.auth?.user_pool_id || "eu-west-2_Lnpv8PpZ9",
      userPoolClientId:
        config?.auth?.user_pool_client_id || "5gcd3psg8eku3h2u3ro2oto9n2",
      identityPoolId:
        config?.auth?.identity_pool_id ||
        "eu-west-2:bb9541a9-eb31-407b-9313-6d5f119d97c6",
      loginWith: {
        email: true,
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </StrictMode>
);
