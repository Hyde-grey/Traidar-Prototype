import styles from "./Sentiment.module.css";
import {
  useSentiment,
  getSentimentColor,
  getSentimentEmoji,
} from "../../../../../hooks/useSentiment";
import { FadeInMotion } from "../../../../../components/common";
import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { AssetContext } from "../../../../../context/AssetContext";

/**
 * Displays asset-based sentiment information with visual indicators
 */
const Sentiment = () => {
  const { data, loading } = useSentiment();
  const { assetData } = useContext(AssetContext);

  // Format date for display
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Extract the latest sentiment data (first item in the array)
  const latestSentiment = data && data.length > 0 ? data[0] : null;

  return (
    <AnimatePresence mode="wait">
      <FadeInMotion
        key="sentiment"
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      >
        <div className={styles.sentimentContainer}>
          <div className={styles.sentimentHeader}>
            <h4>{formattedDate}</h4>
          </div>

          <h3>
            <span className={styles.white}>
              {assetData ? `${assetData.symbol} Sentiment is` : null}
            </span>
            {loading ? (
              <span className={styles.loading}>Loading</span>
            ) : latestSentiment ? (
              <>
                <span
                  className={styles.sentimentValue}
                  style={{
                    color: getSentimentColor(
                      latestSentiment.value_classification
                    ),
                  }}
                >
                  {getSentimentEmoji(latestSentiment.value_classification)}{" "}
                  {latestSentiment.value_classification} (
                  {latestSentiment.value})
                </span>
              </>
            ) : (
              <span className={styles.neutral}>Unavailable</span>
            )}
          </h3>
          <hr className={styles.divider} />
        </div>
      </FadeInMotion>
    </AnimatePresence>
  );
};

export default Sentiment;
