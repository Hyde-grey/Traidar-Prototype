import type { Schema } from "./resource";

export const handler: Schema["getBinanceData"]["functionHandler"] = async (event) => {
  try {
    // const { symbol } = event.arguments;
    console.log(event.arguments);
    
    // Fetch real-time price data from Binance API
    const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Binance data: ${response.statusText}`);
    }
    
    const data = await response.json();
    // Return formatted data as a string
    return JSON.stringify({
      symbol: data.symbol,
      lastPrice: data.lastPrice,
      priceChange: data.priceChange,
      priceChangePercent: data.priceChangePercent,
      volume: data.volume,
      high24h: data.highPrice,
      low24h: data.lowPrice,
      timestamp: new Date().toISOString()
    }, null, 2);
  } catch (error) {
    console.error("Error fetching Binance data:", error);
    throw error;
  }
}; 