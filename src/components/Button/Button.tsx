import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  svg?: React.ReactNode;
  text: string;
};

const Button = ({ svg, text }: ButtonProps) => {
  return (
    <button className={styles.button}>
      {svg}
      <p>{text}</p>
    </button>
  );
};

export default Button;
