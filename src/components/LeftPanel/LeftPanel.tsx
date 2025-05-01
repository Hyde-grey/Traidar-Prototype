import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import styles from "./LeftPanel.module.css";

const LeftPanel = () => {
  return (
    <div className={styles.leftPanel}>
      <div className={styles.panelHeader}>
        <div className={styles.searchBar}>
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
              strokeWidth="1.5"
            />
            <path
              d="M17.333 16.8611L20.4889 20.017"
              stroke="#8B8F92"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input type="search" placeholder="Search Assets" />
        </div>

        <Button
          svg={
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
                strokeWidth="1.5"
              />
              <path
                d="M15 6H9"
                stroke="#6C757D"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          }
          text={"Saved"}
        />
      </div>
      <Loader />
    </div>
  );
};

export default LeftPanel;
