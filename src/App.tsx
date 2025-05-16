import { useState } from "react";
import { Logo, Nav, Login } from "./components/common";
import LandingPage from "./pages/Landing/LandingPage";

import { NavType } from "./types";
import { UserProvider } from "./context/UserContext";

import "./styles/App.css";

function App() {
  const [activeNav, setActiveNav] = useState<NavType>("analysis");

  return (
    <UserProvider>
      <div className="mainContainer">
        <div className="navigationBar">
          <Logo />
          <Nav activeNav={activeNav} setActiveNav={setActiveNav} />
          <Login />
        </div>

        <LandingPage />
      </div>
    </UserProvider>
  );
}

export default App;
