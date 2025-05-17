import { SearchAssets } from "../../components/features/SearchAssets";
import Orb from "../../components/features/Orb/Orb";
import Stars from "../../assets/SVG/Stars.svg";
import styles from "./LandingPage.module.css";
import { FadeInMotion } from "../../components/common";

const LandingPage = () => {
  return (
    <FadeInMotion
      transition={{ duration: 5, ease: "easeOut" }}
      exit={{ opacity: 0, scale: 5, transition: { duration: 2 } }}
      className={styles.landingPage}
    >
      <Orb
        hoverIntensity={1}
        rotateOnHover={true}
        hue={256}
        forceHoverState={false}
      />
      <FadeInMotion
        transition={{ duration: 5, ease: "easeOut" }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className={styles.searchBarContainer}
      >
        <div className={styles.searchBarHeader}>
          <img src={Stars} alt="Pip AI Agent" />
          <h2>Pip AI Agent</h2>
          <p>Analyse any asset, with real time data, powered by expert AI.</p>
        </div>
        <div className={styles.searchBarWrapper}>
          <SearchAssets />
        </div>
      </FadeInMotion>
    </FadeInMotion>
  );
};

export default LandingPage;
