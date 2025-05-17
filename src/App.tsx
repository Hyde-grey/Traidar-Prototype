import { useEffect, useState } from "react";
import { Logo, Nav, Login } from "./components/common";
import LandingPage from "./pages/Landing/LandingPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

import { NavType } from "./types";
import { UserProvider } from "./context/UserContext";
import { AssetProvider } from "./context/AssetContext";

import "./styles/App.css";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home/Home";

// Create a wrapper component that has access to the location
function AppContent() {
  const [activeNav, setActiveNav] = useState<NavType>("analysis");
  const [isHome, setIsHome] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [location.pathname]);

  return (
    <div className="mainContainer">
      {isHome ? null : (
        <div className="navigationBar">
          <Logo />
          <Nav activeNav={activeNav} setActiveNav={setActiveNav} />
          <Login />
        </div>
      )}
      <div className="contentArea">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <HashRouter>
        <AssetProvider>
          <AppContent />
        </AssetProvider>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
