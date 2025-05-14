// Import Schema type but avoid circular dependency
type BinanceDataSchema = {
  getBinanceData: {
    functionHandler: (event: {
      arguments: {
        symbol: string;
      };
    }) => Promise<string>;
  };
};

// Define standard error response format
interface ErrorResponse {
  error: string;
  message: string;
  timestamp: string;
}

// Define success response format
interface BinanceDataResponse {
  symbol: string;
  lastPrice: number;
  priceChange: number;
  priceChangePercent: number;
  volume: number;
  high24h: number;
  low24h: number;
  openPrice: number;
  quoteVolume: number;
  count: number;
  timestamp: string;
  openTime: string;
  closeTime: string;
}

// Validate symbol format
function isValidSymbol(symbol: string): boolean {
  // Basic validation - symbols should be uppercase and typically 6-12 chars
  return /^[A-Z0-9]{2,12}$/.test(symbol);
}

export const handler: BinanceDataSchema["getBinanceData"]["functionHandler"] = async (
  event
) => {
  try {
    const { symbol } = event.arguments;

    // Validate input
    if (!symbol) {
      return formatErrorResponse(
        "MISSING_PARAMETER",
        "Symbol parameter is required"
      );
    }

    // Validate symbol format
    if (!isValidSymbol(symbol)) {
      return formatErrorResponse(
        "INVALID_SYMBOL",
        `Invalid symbol format: ${symbol}`
      );
    }

    // Add cache control headers to prevent rate limiting issues
    const headers = {
      "Cache-Control": "max-age=5", // Cache for 5 seconds
    };

    // Fetch real-time price data from Binance API for specific symbol
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
      {
        headers,
      }
    );

    if (!response.ok) {
      return formatErrorResponse(
        "API_ERROR",
        `Failed to fetch Binance data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Validate the response data
    if (!data || !data.lastPrice) {
      return formatErrorResponse(
        "INVALID_RESPONSE",
        `Invalid data received for symbol ${symbol}`
      );
    }

    // Format and parse numeric values
    const formattedData: BinanceDataResponse = {
      symbol: data.symbol,
      lastPrice: parseFloat(data.lastPrice),
      priceChange: parseFloat(data.priceChange),
      priceChangePercent: parseFloat(data.priceChangePercent),
      volume: parseFloat(data.volume),
      high24h: parseFloat(data.highPrice),
      low24h: parseFloat(data.lowPrice),
      openPrice: parseFloat(data.openPrice),
      quoteVolume: parseFloat(data.quoteVolume),
      count: parseInt(data.count), // Number of trades
      timestamp: new Date().toISOString(),
      openTime: new Date(data.openTime).toISOString(),
      closeTime: new Date(data.closeTime).toISOString(),
    };

    // Return formatted data
    return JSON.stringify(formattedData, null, 2);
  } catch (error) {
    console.error("Error fetching Binance data:", error);
    return formatErrorResponse(
      "UNEXPECTED_ERROR",
      "An unexpected error occurred while fetching market data"
    );
  }
};

// Helper function to format error responses
function formatErrorResponse(code: string, message: string): string {
  const errorResponse: ErrorResponse = {
    error: code,
    message,
    timestamp: new Date().toISOString(),
  };

  return JSON.stringify(errorResponse, null, 2);
}
