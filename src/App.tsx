import Logo from "./components/Logo/Logo";
import Nav from "./components/Nav/Nav";
import Login from "./components/Auth/Login";

import "./App.css";
import { useState } from "react";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import RightPanel from "./components/RightPanel/RigthPanel";

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
