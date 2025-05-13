import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@aws-amplify/ui-react/styles.css";
// Remove the imports for the outputs.json file
import "./styles/index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import config from "../amplify_outputs.json";

// Configure Amplify for Gen 2 using our config function
Amplify.configure(config);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </StrictMode>
);
