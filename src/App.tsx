import Logo from "./components/Logo/Logo";
import Nav from "./components/Nav/Nav";
import Login from "./components/Auth/Login";

import "./App.css";
import { useState } from "react";

function App() {
  const [activeNav, setActiveNav] = useState<"portfolio" | "news" | "analysis">(
    "analysis"
  );
  return (
    <>
      <div className="mainContainer">
        <div className="navigationBar">
          <Logo />
          <Nav activeNav={activeNav} setActiveNav={setActiveNav} />
          <Login />
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
