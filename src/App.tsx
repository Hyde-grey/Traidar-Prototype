import Logo from "./components/Header/Logo/Logo";
import Nav from "./components/Header/Nav/Nav";
import Login from "./components/Header/Auth/Login";

import "./App.css";
import { useState } from "react";
import LeftPanel from "./components/Dashboard/LeftPanel/LeftPanel";
import RightPanel from "./components/Dashboard/RightPanel/RigthPanel";

function App() {
  const [activeNav, setActiveNav] = useState<"portfolio" | "news" | "analysis">(
    "analysis"
  );
  return (
    <>
      <div className="mainContainer">
        <div className="navigationBar">
          <Logo />
          <Nav activeNav={activeNav} setActiveNav={setActiveNav} />
          <Login />
        </div>

        <div className="dashboardContainer">
          <LeftPanel />
          <RightPanel />
        </div>
      </div>
    </>
  );
}

export default App;
