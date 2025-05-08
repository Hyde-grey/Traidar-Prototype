import { useState, useEffect, useContext } from "react";
import { AssetContext } from "../context/AssetContext";

export type SentimentData = {
  value: number;
  value_classification:
    | "Fear"
    | "Extreme Fear"
    | "Neutral"
    | "Greed"
    | "Extreme Greed";
  timestamp: string;
  time_until_update: string;
};

export type SentimentResponse = {
  data: SentimentData[];
  loading: boolean;
  error: Error | null;
};

// Default sentiment data when no asset is selected
const DEFAULT_SENTIMENT: SentimentData = {
  value: 50,
  value_classification: "Neutral",
  timestamp: new Date().toISOString(),
  time_until_update: "Live",
};

/**
 * Custom hook that calculates market sentiment based on selected asset's price change
 */
export const useSentiment = (): SentimentResponse => {
  const [data, setData] = useState<SentimentData[]>([DEFAULT_SENTIMENT]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { assetData } = useContext(AssetContext);

  useEffect(() => {
    setLoading(true);

    try {
      if (assetData) {
        // Calculate sentiment value based on price change percentage
        // Map from price change (-20% to +20%) to sentiment value (0-100)
        const priceChange = assetData.priceChangePercent;

        // Convert price change to sentiment value (0-100)
        // 0 = Extreme Fear, 100 = Extreme Greed
        let sentimentValue = 50; // Default to Neutral

        if (priceChange <= -10) {
          // Extreme Fear: price drop more than 10%
          sentimentValue = Math.max(0, 20 - Math.abs(priceChange));
        } else if (priceChange < 0) {
          // Fear: price drop between 0% and 10%
          sentimentValue = 40 - Math.abs(priceChange) * 2;
        } else if (priceChange === 0) {
          // Neutral: no price change
          sentimentValue = 50;
        } else if (priceChange <= 10) {
          // Greed: price increase between 0% and 10%
          sentimentValue = 60 + priceChange * 2;
        } else {
          // Extreme Greed: price increase more than 10%
          sentimentValue = Math.min(100, 80 + priceChange);
        }

        // Ensure value is within 0-100 range
        sentimentValue = Math.max(0, Math.min(100, sentimentValue));

        // Get classification based on value
        const classification = getClassificationFromValue(sentimentValue);

        const sentimentData: SentimentData = {
          value: Math.round(sentimentValue),
          value_classification: classification,
          timestamp: new Date().toISOString(),
          time_until_update: "Live",
        };

        setData([sentimentData]);
      } else {
        // No asset selected, use default neutral sentiment
        setData([DEFAULT_SENTIMENT]);
      }
      setError(null);
    } catch (err) {
      console.error("Error calculating sentiment:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to calculate sentiment")
      );
      setData([DEFAULT_SENTIMENT]);
    } finally {
      setLoading(false);
    }
  }, [assetData]);

  return {
    data,
    loading,
    error,
  };
};

// Helper function to determine classification from numerical value
const getClassificationFromValue = (
  value: number
): SentimentData["value_classification"] => {
  if (value <= 20) return "Extreme Fear";
  if (value <= 40) return "Fear";
  if (value <= 60) return "Neutral";
  if (value <= 80) return "Greed";
  return "Extreme Greed";
};

// Utility functions to help interpret sentiment
export const getSentimentColor = (classification: string): string => {
  switch (classification) {
    case "Extreme Fear":
      return "#E53935"; // Red
    case "Fear":
      return "#FF9800"; // Orange
    case "Neutral":
      return "#FFEB3B"; // Yellow
    case "Greed":
      return "#8BC34A"; // Light Green
    case "Extreme Greed":
      return "#4CAF50"; // Green
    default:
      return "#9E9E9E"; // Grey
  }
};

export const getSentimentEmoji = (classification: string): string => {
  switch (classification) {
    case "Extreme Fear":
      return "😱";
    case "Fear":
      return "😰";
    case "Neutral":
      return "😐";
    case "Greed":
      return "😀";
    case "Extreme Greed":
      return "🤑";
    default:
      return "❓";
  }
};
