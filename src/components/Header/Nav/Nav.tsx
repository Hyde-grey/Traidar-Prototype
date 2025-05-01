import PortfolioIcon from "../../../assets/SVG/Portfolio.svg";
import NewsIcon from "../../../assets/SVG/News.svg";
import AnalysisIcon from "../../../assets/SVG/Analysis.svg";
import styles from "./Nav.module.css";

type NavProps = {
  activeNav: "portfolio" | "news" | "analysis";
  setActiveNav: (nav: "portfolio" | "news" | "analysis") => void;
};

const Nav = ({ activeNav, setActiveNav }: NavProps) => {
  return (
    <div className={styles.nav}>
      <div
        className={`${styles.navItem} ${
          activeNav === "portfolio" ? styles.activeNavItem : ""
        }`}
        onClick={() => setActiveNav("portfolio")}
      >
        <img
          src={PortfolioIcon}
          alt="Portfolio"
          className={`${styles.navIcon} ${
            activeNav === "portfolio" ? styles.activeIcon : ""
          }`}
        />
        <p>Portfolio</p>
      </div>
      <div
        className={`${styles.navItem} ${
          activeNav === "news" ? styles.activeNavItem : ""
        }`}
        onClick={() => setActiveNav("news")}
      >
        <img
          src={NewsIcon}
          alt="News"
          className={`${styles.navIcon} ${
            activeNav === "news" ? styles.activeIcon : ""
          }`}
        />
        <p>News</p>
      </div>
      <div
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
      </div>
    </div>
  );
};

export default Nav;
