import { useState, useEffect } from "react";

// Define sentiment data structures
export type SentimentLevel =
  | "Very Bearish"
  | "Bearish"
  | "Neutral"
  | "Bullish"
  | "Very Bullish";

export type SentimentData = {
  value: number;
  classification: SentimentLevel;
  timestamp: string;
};

export type SentimentResponse = {
  data: SentimentData | null;
  loading: boolean;
  error: Error | null;
};

// We'll use rotating mock data since some APIs require authentication
const MOCK_SENTIMENT_DATA: SentimentData[] = [
  {
    value: 72,
    classification: "Bullish",
    timestamp: new Date().toISOString(),
  },
  {
    value: 42,
    classification: "Neutral",
    timestamp: new Date().toISOString(),
  },
  {
    value: 65,
    classification: "Bullish",
    timestamp: new Date().toISOString(),
  },
  {
    value: 83,
    classification: "Very Bullish",
    timestamp: new Date().toISOString(),
  },
  {
    value: 30,
    classification: "Bearish",
    timestamp: new Date().toISOString(),
  },
];

export const useSentimentAlternative = (): SentimentResponse => {
  const [data, setData] = useState<SentimentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSentiment = () => {
      try {
        setLoading(true);

        // Get random sentiment from our mock data for demonstration
        const randomIndex = Math.floor(
          Math.random() * MOCK_SENTIMENT_DATA.length
        );
        const mockData = { ...MOCK_SENTIMENT_DATA[randomIndex] };

        // Update timestamp
        mockData.timestamp = new Date().toISOString();

        // Simulate network delay
        setTimeout(() => {
          setData(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error with sentiment data:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to get sentiment data")
        );
        setLoading(false);
      }
    };

    // Initial fetch
    fetchSentiment();

    // Refresh sentiment every 30 seconds for demonstration purposes
    const interval = setInterval(fetchSentiment, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};

// Utility functions to help interpret sentiment
export const getSentimentColor = (classification: SentimentLevel): string => {
  switch (classification) {
    case "Very Bearish":
      return "#E53935"; // Red
    case "Bearish":
      return "#FF9800"; // Orange
    case "Neutral":
      return "#FFEB3B"; // Yellow
    case "Bullish":
      return "#8BC34A"; // Light Green
    case "Very Bullish":
      return "#4CAF50"; // Green
    default:
      return "#9E9E9E"; // Grey
  }
};

export const getSentimentEmoji = (classification: SentimentLevel): string => {
  switch (classification) {
    case "Very Bearish":
      return "🐻";
    case "Bearish":
      return "📉";
    case "Neutral":
      return "😐";
    case "Bullish":
      return "📈";
    case "Very Bullish":
      return "🐂";
    default:
      return "❓";
  }
};
