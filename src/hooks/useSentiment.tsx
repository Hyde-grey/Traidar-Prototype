import { useState, useEffect } from "react";

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

export const useSentiment = (): SentimentResponse => {
  const [data, setData] = useState<SentimentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        setLoading(true);
        console.log("Fetching sentiment data...");

        // Add cache-busting query parameter to prevent caching
        const timestamp = new Date().getTime();
        const response = await fetch(
          `https://api.alternative.me/fng/?_=${timestamp}`,
          {
            cache: "no-store",
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Sentiment API response:", result);

        if (
          !result.data ||
          !Array.isArray(result.data) ||
          result.data.length === 0
        ) {
          throw new Error("Invalid response format from sentiment API");
        }

        setData(result.data);
        console.log("Updated sentiment data:", result.data[0]);
      } catch (err) {
        console.error("Error fetching sentiment data:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch sentiment data")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSentiment();

    // Polling interval
    const interval = setInterval(fetchSentiment, 10 * 60 * 1000); // Every 10 minutes

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
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
