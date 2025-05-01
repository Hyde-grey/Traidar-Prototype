import TraidarLogo from "../src/IMG/Traidar_Logo_white.png";
import "./App.css";
import { useState } from "react";

function App() {
  const [activeNav, setActiveNav] = useState("analysis");

  return (
    <>
      <div className="mainContainer">
        <div className="navigationBar">
          <div className="logo">
            <img src={TraidarLogo} alt="Traidar-logo" />
          </div>

          <div className="nav">
            <div
              className={`navItem ${
                activeNav === "portfolio" ? "activeNavItem" : ""
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
              className={`navItem ${
                activeNav === "news" ? "activeNavItem" : ""
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
              className={`navItem ${
                activeNav === "analysis" ? "activeNavItem" : ""
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
          <div className="sign ">Login</div>
        </div>

        <div className="dashboardContainer">
          <div className="leftPanel">
            <div className="panelHeader">
              <div className="searchBar">
                <svg
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0212 19.1153C15.7521 19.1153 19.5873 15.2801 19.5873 10.5492C19.5873 5.81826 15.7521 1.98308 11.0212 1.98308C6.29026 1.98308 2.45508 5.81826 2.45508 10.5492C2.45508 15.2801 6.29026 19.1153 11.0212 19.1153Z"
                    stroke="#8B8F92"
                    stroke-width="1.5"
                  />
                  <path
                    d="M17.333 16.8611L20.4889 20.017"
                    stroke="#8B8F92"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <input type="search" placeholder="Search Assets" />
              </div>

              <button className="button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z"
                    stroke="#6C757D"
                    stroke-width="1.5"
                  />
                  <path
                    d="M15 6H9"
                    stroke="#6C757D"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <p>Saved</p>
              </button>
            </div>
            <div className="loader">
              <p>Please select an Asset</p>
            </div>
          </div>

          <div className="rightPanel">
            <div className="panelHeader">
              <button className="button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="#6C757D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="0.5 3.5"
                  />
                  <path
                    d="M22 12C22 6.47715 17.5228 2 12 2"
                    stroke="#6C757D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 9V13H16"
                    stroke="#6C757D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>Chat History</p>
              </button>
              <div className="toneSelector button">
                <span>Tone:</span>
                <select className="blueText">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
            <div className="loader">
              <p>Please select an Asset</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
