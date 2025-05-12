import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";
// import config from "../amplify_outputs.json";
import "./styles/index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import App from "./App.tsx";

// Configure Amplify with sandbox outputs
Amplify.configure(outputs);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </StrictMode>
);
