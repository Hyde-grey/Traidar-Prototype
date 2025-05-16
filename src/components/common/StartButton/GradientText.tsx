import styles from "./GradientText.module.css";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  fontSize?: string;
  fontWeight?: string | number;
  textAlign?: "left" | "center" | "right";
  size?: "small" | "medium" | "large" | "xlarge";
}

// Font size presets
const fontSizePresets = {
  small: "1rem",
  medium: "1.5rem",
  large: "2rem",
  xlarge: "3rem",
};

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  fontSize,
  fontWeight = 600,
  textAlign = "center",
  size = "xlarge",
}) => {
  const animationDuration = `${speed}s`;

  // Determine font size - prefer direct fontSize prop over size preset
  const finalFontSize = fontSize || fontSizePresets[size];

  return (
    <div
      className={`${styles.shinyText} ${
        disabled ? "disabled" : ""
      } ${className}`}
      style={{
        animationDuration,
        fontSize: finalFontSize,
        fontWeight,
        textAlign,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
