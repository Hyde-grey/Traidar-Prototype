import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@aws-amplify/ui-react/styles.css";
import "./styles/index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import config from "../amplify_outputs.json";

// Configure Amplify with proper type assertions to prevent TS errors
Amplify.configure(config as any);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </StrictMode>
);
