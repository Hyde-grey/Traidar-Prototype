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

// Fallback data in case API calls fail
const FALLBACK_DATA: SentimentData[] = [
  {
    value: 59, // Current Fear & Greed value as of May 2024
    value_classification: "Greed",
    timestamp: new Date().toISOString(),
    time_until_update: "24h",
  },
];

export const useSentiment = (): SentimentResponse => {
  const [data, setData] = useState<SentimentData[]>(FALLBACK_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        setLoading(true);
        console.log("Attempting to fetch live sentiment data...");

        // Try using a CORS proxy with the CoinMarketCap API
        // CORS Anywhere is a demo server for development only
        const cmcApiUrl =
          "https://api.coinmarketcap.com/data-api/v3/fear-greed/chart?field=value";
        const corsProxyUrl = "https://proxy.cors.sh/";
        const proxyUrl = `${corsProxyUrl}${cmcApiUrl}`;

        console.log("Fetching from CMC via CORS proxy:", proxyUrl);

        const response = await fetch(proxyUrl, {
          method: "GET",
          headers: {
            "x-cors-api-key": "temp_deb32e9c11da222a0ce4cdd41805f59b",
            Origin: window.location.origin,
          },
          signal: AbortSignal.timeout(10000),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("API response via proxy:", result);

          if (
            result.data &&
            result.data.points &&
            Object.keys(result.data.points).length > 0
          ) {
            // Get most recent data point
            const timestamps = Object.keys(result.data.points).sort();
            const latestTimestamp = timestamps[timestamps.length - 1];
            const latestValue = result.data.points[latestTimestamp];

            // Convert to our format
            const classification = getClassificationFromValue(latestValue);
            const convertedData: SentimentData[] = [
              {
                value: latestValue,
                value_classification: classification,
                timestamp: new Date(parseInt(latestTimestamp)).toISOString(),
                time_until_update: "24h",
              },
            ];

            setData(convertedData);
            console.log("Successfully fetched live data:", convertedData[0]);
            setError(null);
          } else {
            throw new Error("Invalid data format from API");
          }
        } else {
          throw new Error(`API responded with status ${response.status}`);
        }
      } catch (err) {
        console.error("Error fetching sentiment data:", err);

        // Keep using the fallback data, but set the error
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch sentiment data")
        );

        // We're already using fallback data as initial state, so no need to setData again
        console.log("Using fallback sentiment data:", FALLBACK_DATA[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchSentiment();

    // Polling interval - every hour to avoid overusing the proxy
    const interval = setInterval(fetchSentiment, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

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

  return {
    data,
    loading,
    error,
  };
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
