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
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity={activeNav === "portfolio" ? "1" : "0.5"}>
            <path
              d="M8 18C5.17157 18 3.75736 18 2.87868 17.1213C2 16.2426 2 14.8284 2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6C10.8284 6 12.2426 6 13.1213 6.87868C14 7.75736 14 9.17157 14 12"
              stroke={activeNav === "portfolio" ? "#FFFFFF" : "#6C757D"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 12C10 14.8284 10 16.2426 10.8787 17.1213C11.7574 18 13.1716 18 16 18C18.8284 18 20.2426 18 21.1213 17.1213C22 16.2426 22 14.8284 22 12C22 9.17157 22 7.75736 21.1213 6.87868C20.2426 6 18.8284 6 16 6"
              stroke={activeNav === "portfolio" ? "#FFFFFF" : "#6C757D"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <p>Portfolio</p>
      </div>
      <div
        className={`${styles.navItem} ${
          activeNav === "news" ? styles.activeNavItem : ""
        }`}
        onClick={() => setActiveNav("news")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity={activeNav === "news" ? "1" : "0.5"}>
            <path
              d="M2 12C2 10.6868 2.2587 9.3864 2.7612 8.1732C3.2638 6.9599 4.0003 5.8575 4.9289 4.9289C5.8575 4.0003 6.9599 3.2638 8.1732 2.7612C9.3864 2.2587 10.6868 2 12 2C13.3132 2 14.6136 2.2587 15.8268 2.7612C17.0401 3.2638 18.1425 4.0003 19.0711 4.9289C19.9996 5.8575 20.7362 6.9599 21.2388 8.1732C21.7413 9.3864 22 10.6868 22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9996 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7363 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22C10.6868 22 9.3864 21.7413 8.1732 21.2388C6.9599 20.7363 5.8575 19.9997 4.9289 19.0711C4.0003 18.1425 3.2638 17.0401 2.7612 15.8268C2.2587 14.6136 2 13.3132 2 12Z"
              stroke={activeNav === "news" ? "#FFFFFF" : "#6C757D"}
              strokeWidth="1.5"
            />
            <path
              d="M8 12C8 10.6868 8.1035 9.3864 8.3045 8.1732C8.5055 6.9599 8.8001 5.8575 9.1716 4.9289C9.543 4.0003 9.984 3.2638 10.4693 2.7612C10.9546 2.2587 11.4747 2 12 2C12.5253 2 13.0454 2.2587 13.5307 2.7612C14.016 3.2638 14.457 4.0003 14.8284 4.9289C15.1999 5.8575 15.4945 6.9599 15.6955 8.1732C15.8965 9.3864 16 10.6868 16 12C16 13.3132 15.8965 14.6136 15.6955 15.8268C15.4945 17.0401 15.1999 18.1425 14.8284 19.0711C14.457 19.9997 14.016 20.7363 13.5307 21.2388C13.0454 21.7413 12.5253 22 12 22C11.4747 22 10.9546 21.7413 10.4693 21.2388C9.984 20.7363 9.543 19.9997 9.1716 19.0711C8.8001 18.1425 8.5055 17.0401 8.3045 15.8268C8.1035 14.6136 8 13.3132 8 12Z"
              stroke={activeNav === "news" ? "#FFFFFF" : "#6C757D"}
              strokeWidth="1.5"
            />
            <path
              d="M22 12L2 12"
              stroke={activeNav === "news" ? "#FFFFFF" : "#6C757D"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <p>News</p>
      </div>
      <div
        className={`${styles.navItem} ${
          activeNav === "analysis" ? styles.activeNavItem : ""
        }`}
        onClick={() => setActiveNav("analysis")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5"
            stroke={activeNav === "analysis" ? "#FFFFFF" : "#6C757D"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M7 14L8.79689 11.8437C9.50894 10.9893 9.86496 10.562 10.3333 10.562C10.8017 10.562 11.1577 10.9893 11.8698 11.8437L12.1302 12.1563C12.8423 13.0107 13.1983 13.438 13.6667 13.438C14.135 13.438 14.4911 13.0107 15.2031 12.1563L17 10"
            stroke={activeNav === "analysis" ? "#FFFFFF" : "#6C757D"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
            stroke={activeNav === "analysis" ? "#FFFFFF" : "#6C757D"}
            strokeWidth="1.5"
          />
        </svg>
        <p>Analysis</p>
      </div>
    </div>
  );
};

export default Nav;
