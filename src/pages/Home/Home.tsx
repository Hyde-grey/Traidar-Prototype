import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import useSound from "use-sound";
import sound from "../../assets/AUDIO/TraidarStart.mp3";

import ShinyText from "../../components/common/StartButton/GradientText";
import { AnimatePresence, motion } from "framer-motion";
const Home = () => {
  const navigate = useNavigate();
  const [playSound] = useSound(sound);

  const handleEnter = () => {
    playSound();
    navigate("/landing");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.homeContainer}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.homeContainerButton}>
          <button
            className={styles.homeContainerButtonText}
            onClick={handleEnter}
          >
            <ShinyText
              text="Enter"
              disabled={false}
              speed={3}
              className={styles.homeContainerButtonText}
            />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
