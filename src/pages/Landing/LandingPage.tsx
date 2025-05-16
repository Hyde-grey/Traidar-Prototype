import { SearchAssets } from "../../components/features/SearchAssets";
import Orb from "../../components/features/Orb/Orb";
import Stars from "../../assets/SVG/Stars.svg";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={256}
        forceHoverState={false}
      />
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarHeader}>
          <img src={Stars} alt="Pip AI Agent" />
          <h2>Pip AI Agent</h2>
          <p>Analyse any asset, with real time data, powered by expert AI.</p>
        </div>
        <div className={styles.searchBarWrapper}>
          <SearchAssets />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
