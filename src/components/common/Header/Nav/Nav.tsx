import DashboardIcon from "../../../../assets/SVG/Portfolio.svg";
import AnalysisIcon from "../../../../assets/SVG/Analysis.svg";
import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";
import { NavType } from "../../../../types";
import { useEffect } from "react";

type NavProps = {
  activeNav: NavType;
  setActiveNav: (nav: NavType) => void;
};

const Nav = ({ activeNav, setActiveNav }: NavProps) => {
  const location = useLocation();

  // Helper function to determine active nav based on current route
  const getActiveNavFromPath = (path: string): NavType => {
    if (path === "/dashboard") return "dashboard";
    if (path === "/landing") return "analysis";
    return "analysis"; // Default
  };

  // Set active nav based on current route when component mounts or route changes
  useEffect(() => {
    const currentNav = getActiveNavFromPath(location.pathname);
    if (currentNav !== activeNav) {
      setActiveNav(currentNav);
    }
  }, [location.pathname, activeNav, setActiveNav]);

  return (
    <div className={styles.nav}>
      <Link
        to="/dashboard"
        className={`${styles.navItem} ${
          activeNav === "dashboard" ? styles.activeNavItem : ""
        }`}
        onClick={() => setActiveNav("dashboard")}
      >
        <img
          src={DashboardIcon}
          alt="Dashboard"
          className={`${styles.navIcon} ${
            activeNav === "dashboard" ? styles.activeIcon : ""
          }`}
        />
        <p>Dashboard</p>
      </Link>
      <Link
        to="/landing"
        className={`${styles.navItem} ${
          activeNav === "analysis" ? styles.activeNavItem : ""
        }`}
        onClick={() => setActiveNav("analysis")}
      >
        <img
          src={AnalysisIcon}
          alt="Analysis"
          className={`${styles.navIcon} ${
            activeNav === "analysis" ? styles.activeIcon : ""
          }`}
        />
        <p>Analysis</p>
      </Link>
    </div>
  );
};

export default Nav;
