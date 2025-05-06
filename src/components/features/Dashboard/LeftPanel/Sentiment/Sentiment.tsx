import styles from "./Sentiment.module.css";
import {
  useSentimentAlternative,
  getSentimentColor,
  getSentimentEmoji,
  SentimentLevel,
} from "../../../../../hooks/useSentimentAlternative";

// Helper function to determine if sentiment is positive or negative
const getSentimentTone = (
  classification: SentimentLevel
): "Positive" | "Negative" | "Neutral" => {
  switch (classification) {
    case "Very Bearish":
    case "Bearish":
      return "Negative";
    case "Bullish":
    case "Very Bullish":
      return "Positive";
    case "Neutral":
    default:
      return "Neutral";
  }
};

const Sentiment = () => {
  const { data, loading, error } = useSentimentAlternative();

  // Show nothing if there's an error
  if (error) {
    console.error("Error loading sentiment data:", error);
    return null;
  }

  // Format date for display
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.sentimentContainer}>
      <h4>{formattedDate}</h4>
      <h3>
        <span className={styles.white}>Market Sentiment is</span>{" "}
        {loading ? (
          <span className={styles.loading}>Loading...</span>
        ) : data ? (
          <>
            <span className={styles.quickTone}>
              {getSentimentTone(data.classification)}
            </span>
            <span
              className={styles.sentimentValue}
              style={{
                color: getSentimentColor(data.classification),
              }}
            >
              {getSentimentEmoji(data.classification)} {data.classification} (
              {data.value})
            </span>
          </>
        ) : (
          <span className={styles.neutral}>Unavailable</span>
        )}
      </h3>
      <hr className={styles.divider} />
    </div>
  );
};

export default Sentiment;
