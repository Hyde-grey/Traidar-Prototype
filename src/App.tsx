import { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";

import { Logo, Nav, Login } from "./components/common";
import Dashboard from "./components/features/Dashboard/Dashboard";
import { NavType } from "./types";
import { UserProvider } from "./context/UserContext";

import "./styles/App.css";

function App() {
  const [activeNav, setActiveNav] = useState<NavType>("analysis");
  return (
    <Authenticator.Provider>
      <UserProvider>
        <div className="mainContainer">
          <div className="navigationBar">
            <Logo />
            <Nav activeNav={activeNav} setActiveNav={setActiveNav} />
            <Login />
          </div>

          <Dashboard />
        </div>
      </UserProvider>
    </Authenticator.Provider>
  );
}

export default App;
