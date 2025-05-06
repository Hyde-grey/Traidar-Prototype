import { useState } from "react";

import { Logo, Nav, Login } from "./components/common";
import Dashboard from "./components/features/Dashboard/Dashboard";
import { NavType } from "./types";

import "./styles/App.css";

function App() {
  const [activeNav, setActiveNav] = useState<NavType>("analysis");
  return (
    <>
      <div className="mainContainer">
        <div className="navigationBar">
          <Logo />
          <Nav activeNav={activeNav} setActiveNav={setActiveNav} />
          <Login />
        </div>

        <Dashboard />
      </div>
    </>
  );
}

export default App;
