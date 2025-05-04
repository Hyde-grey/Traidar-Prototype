import { useState, useEffect } from "react";
import DefaultCryptoIcon from "../../../../assets/SVG/DefaultCrypto.svg";

export type CryptoMarketData = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  lastPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  baseAsset?: string;
  quoteAsset?: string;
  iconUrl?: string;
  name?: string;
};

// Common cryptocurrency mapping from Binance symbol to CoinGecko ID
const CRYPTO_ID_MAPPING: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  BNB: "binancecoin",
  SOL: "solana",
  XRP: "ripple",
  ADA: "cardano",
  DOGE: "dogecoin",
  TRX: "tron",
  DOT: "polkadot",
  MATIC: "matic-network",
  LTC: "litecoin",
  AVAX: "avalanche-2",
  LINK: "chainlink",
  UNI: "uniswap",
  ATOM: "cosmos",
  XLM: "stellar",
  NEAR: "near",
  ALGO: "algorand",
  FIL: "filecoin",
  ETC: "ethereum-classic",
  SHIB: "shiba-inu",
  VET: "vechain",
};

// A mapping of crypto symbols to their full names
const CRYPTO_NAME_MAPPING: Record<string, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  BNB: "Binance Coin",
  SOL: "Solana",
  XRP: "XRP",
  ADA: "Cardano",
  DOGE: "Dogecoin",
  TRX: "TRON",
  DOT: "Polkadot",
  MATIC: "Polygon",
  LTC: "Litecoin",
  AVAX: "Avalanche",
  LINK: "Chainlink",
  UNI: "Uniswap",
  ATOM: "Cosmos",
  XLM: "Stellar",
  NEAR: "NEAR Protocol",
  ALGO: "Algorand",
  FIL: "Filecoin",
  ETC: "Ethereum Classic",
  SHIB: "Shiba Inu",
  VET: "VeChain",
};

export const useFetchCryptoData = (
  filterQuote: string = "USDT" // Default to USDT pairs
) => {
  const [data, setData] = useState<CryptoMarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [coinGeckoData, setCoinGeckoData] = useState<Record<string, any>>({});

  // First fetch CoinGecko's list of coins with icons
  useEffect(() => {
    const fetchCoinGeckoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1"
        );
        if (!response.ok) {
          console.warn("Could not load CoinGecko data, using fallback icons");
          return;
        }

        const coins = await response.json();
        const coinData: Record<string, any> = {};

        // Create a map of crypto symbols to their icon URLs
        coins.forEach((coin: any) => {
          const symbol = coin.symbol.toUpperCase();
          if (
            !coinData[symbol] ||
            coinData[symbol].market_cap < coin.market_cap
          ) {
            coinData[symbol] = {
              id: coin.id,
              name: coin.name,
              image: coin.image,
              market_cap: coin.market_cap,
            };
          }
        });

        setCoinGeckoData(coinData);
      } catch (error) {
        console.warn("Error fetching CoinGecko data:", error);
      }
    };

    fetchCoinGeckoData();
  }, []);

  // Then fetch Binance data and combine with icon data
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);

        // 1. First get exchange info to get symbol details
        const exchangeInfoResponse = await fetch(
          "https://api.binance.com/api/v3/exchangeInfo"
        );
        if (!exchangeInfoResponse.ok) {
          throw new Error(`HTTP error! status: ${exchangeInfoResponse.status}`);
        }
        const exchangeInfo = await exchangeInfoResponse.json();

        // Get mapping of symbols to their base/quote assets
        const symbolDetails = exchangeInfo.symbols.reduce(
          (
            acc: Record<string, { baseAsset: string; quoteAsset: string }>,
            symbol: any
          ) => {
            acc[symbol.symbol] = {
              baseAsset: symbol.baseAsset,
              quoteAsset: symbol.quoteAsset,
            };
            return acc;
          },
          {}
        );

        // 2. Get 24hr ticker data
        const tickerResponse = await fetch(
          "https://api.binance.com/api/v3/ticker/24hr"
        );
        if (!tickerResponse.ok) {
          throw new Error(`HTTP error! status: ${tickerResponse.status}`);
        }
        const tickers = await tickerResponse.json();

        // 3. Filter for cryptocurrency pairs and map to our format
        const cryptoData = tickers
          // Only include pairs with the specified quote asset (e.g., USDT)
          .filter((ticker: any) => {
            const details = symbolDetails[ticker.symbol];
            return details && details.quoteAsset === filterQuote;
          })
          .map((ticker: any) => {
            const details = symbolDetails[ticker.symbol];
            const baseAsset = details.baseAsset;

            // Try to get the icon from CoinGecko data
            let iconUrl = DefaultCryptoIcon;
            let cryptoName = "";

            // First check if we have the data in our CoinGecko cache
            if (coinGeckoData[baseAsset] && coinGeckoData[baseAsset].image) {
              iconUrl = coinGeckoData[baseAsset].image;
              cryptoName = coinGeckoData[baseAsset].name || "";
            }
            // Otherwise, check if we can map it to a known CoinGecko ID
            else if (CRYPTO_ID_MAPPING[baseAsset]) {
              const id = CRYPTO_ID_MAPPING[baseAsset];
              // If we have the mapped crypto in our CoinGecko data
              if (
                coinGeckoData[id.toUpperCase()] &&
                coinGeckoData[id.toUpperCase()].image
              ) {
                iconUrl = coinGeckoData[id.toUpperCase()].image;
                cryptoName = coinGeckoData[id.toUpperCase()].name || "";
              }
            }

            // If we still don't have a name, use our fallback mapping
            if (!cryptoName && CRYPTO_NAME_MAPPING[baseAsset]) {
              cryptoName = CRYPTO_NAME_MAPPING[baseAsset];
            }

            return {
              symbol: ticker.symbol,
              baseAsset: baseAsset,
              quoteAsset: details.quoteAsset,
              priceChange: ticker.priceChange,
              priceChangePercent: ticker.priceChangePercent,
              lastPrice: ticker.lastPrice,
              highPrice: ticker.highPrice,
              lowPrice: ticker.lowPrice,
              volume: ticker.volume,
              quoteVolume: ticker.quoteVolume,
              iconUrl: iconUrl,
              name: cryptoName || baseAsset,
            };
          });

        setData(cryptoData);
        setError(null);
      } catch (error) {
        console.error("API Error:", error);
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred")
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [filterQuote, coinGeckoData]);

  return { data, loading, error };
};

// Keep the original hook for other uses
export const useFetchData = (
  endpoint: string,
  params?: Record<string, string>
) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const baseUrl = `https://api.binance.com/api/v3`;
      const url = new URL(`${baseUrl}/${endpoint}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      try {
        setLoading(true);
        const response = await fetch(url.toString());
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (error) {
        console.error("API Error:", error);
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred")
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromAPI();
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
};
