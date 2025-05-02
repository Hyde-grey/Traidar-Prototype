import styles from "./Loader.module.css";
import FadeInMotion from "../../motion/fadeInMotion";

/**
 * Default loader/placeholder that shows when no content is selected
 */
const Loader = () => {
  return (
    <FadeInMotion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className={styles.centeredLoader}>
        <p>Please select an Asset</p>
      </div>
    </FadeInMotion>
  );
};

export default Loader;
