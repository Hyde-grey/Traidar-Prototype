import TraidarLogo from "../../../../assets/IMG/Traidar_Logo_white.png";
import styles from "./Logo.module.css";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <img src={TraidarLogo} alt="Traidar-logo" />
      </Link>
    </div>
  );
};

export default Logo;
