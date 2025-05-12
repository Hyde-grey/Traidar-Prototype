import type { Schema } from "./resource";

export const handler: Schema["getBinanceData"]["functionHandler"] = async (event) => {
  try {
    const { symbol } = event.arguments;
    
    if (!symbol) {
      throw new Error('Symbol parameter is required');
    }

    // Fetch real-time price data from Binance API for specific symbol
    const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Binance data: ${response.statusText}`);
    }
    
    const data = await response.json();

    // Validate the response data
    if (!data || !data.lastPrice) {
      throw new Error(`Invalid data received for symbol ${symbol}`);
    }

    // Format and parse numeric values
    const formattedData = {
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
      closeTime: new Date(data.closeTime).toISOString()
    };

    // Return formatted data
    return JSON.stringify(formattedData, null, 2);
  } catch (error) {
    console.error("Error fetching Binance data:", error);
    throw error;
  }
}; 