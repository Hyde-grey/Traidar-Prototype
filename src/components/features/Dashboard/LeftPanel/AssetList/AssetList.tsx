import { useState, useEffect } from "react";
import ChartArrow from "../../../../assets/SVG/ChartArrow.svg";
import {
  useFetchCryptoData,
  CryptoMarketData,
} from "../../../../../hooks/useFetchData";
import styles from "./AssetList.module.css";

type Asset = {
  symbol: string;
  name: string;
  exchange: string;
  iconUrl: string;
};

// Define common crypto exchanges
const exchangeMap: Record<string, string> = {
  BTC: "Binance",
  ETH: "Binance",
  SOL: "Binance",
  ADA: "Binance",
  NVDA: "TradingView",
  AAPL: "TradingView",
  TSLA: "TradingView",
};

// List of trending assets to show at the top (in this order)
const trendingSymbols = ["BTC", "ETH", "NVDA"];

// List of assets to show in the all assets section
const allAssetsOrder = ["AAPL", "TSLA", "ADA", "MSFT", "AMZN", "SOL"];

const AssetList = () => {
  const { data: cryptoData, loading } = useFetchCryptoData();
  const [allAssets, setAllAssets] = useState<Asset[]>([]);
  const [trendingAssets, setTrendingAssets] = useState<Asset[]>([]);

  useEffect(() => {
    if (cryptoData.length > 0) {
      // Convert Binance data to our format
      const formattedCryptoData = cryptoData
        .filter(
          (crypto: CryptoMarketData) => crypto.baseAsset && crypto.iconUrl
        ) // Filter out any items with undefined values
        .map((crypto: CryptoMarketData) => ({
          symbol: crypto.baseAsset as string,
          name: crypto.baseAsset as string,
          exchange: exchangeMap[crypto.baseAsset as string] || "Binance",
          iconUrl: crypto.iconUrl as string,
        }));

      // Combine crypto and stock data
      const combinedAssets = [...formattedCryptoData];

      // Filter out trending assets
      const trending = combinedAssets.filter((asset) =>
        trendingSymbols.includes(asset.symbol)
      );

      // Sort trending by the order in trendingSymbols
      trending.sort(
        (a, b) =>
          trendingSymbols.indexOf(a.symbol) - trendingSymbols.indexOf(b.symbol)
      );

      // Prioritize specific assets for the "All Assets" section
      const prioritizedAssets = combinedAssets.filter(
        (asset) =>
          allAssetsOrder.includes(asset.symbol) &&
          !trendingSymbols.includes(asset.symbol)
      );

      prioritizedAssets.sort(
        (a, b) =>
          allAssetsOrder.indexOf(a.symbol) - allAssetsOrder.indexOf(b.symbol)
      );

      // Get remaining assets that aren't trending and aren't in the prioritized list
      const remainingAssets = combinedAssets.filter(
        (asset) =>
          !trendingSymbols.includes(asset.symbol) &&
          !allAssetsOrder.includes(asset.symbol)
      );

      // Combine prioritized and remaining assets
      const all = [...prioritizedAssets, ...remainingAssets];

      setTrendingAssets(trending);
      setAllAssets(all);
    }
  }, [cryptoData]);

  return (
    <div className={styles.assetListContainer}>
      {/* Trending Assets Section */}
      <div className={styles.sectionHeader}>
        <h2>Trending Assets</h2>
        <img
          src={ChartArrow}
          alt="Trending Up"
          className={styles.trendingIcon}
        />
      </div>

      <div className={styles.assetList}>
        {loading ? (
          <p className={styles.loadingText}>Loading assets...</p>
        ) : (
          trendingAssets.map((asset) => (
            <div key={asset.symbol} className={styles.assetItem}>
              <div className={styles.assetIcon}>
                <img src={asset.iconUrl} alt={asset.symbol} />
              </div>
              <div className={styles.assetInfo}>
                <span className={styles.assetSymbol}>{asset.symbol}</span>
                <span className={styles.assetExchange}>({asset.exchange})</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* All Assets Section */}
      <div className={styles.sectionHeader}>
        <h2>All Assets</h2>
        <div className={styles.divider}></div>
      </div>

      <div className={`${styles.assetList} ${styles.scrollable}`}>
        {loading ? (
          <p className={styles.loadingText}>Loading assets...</p>
        ) : (
          allAssets.map((asset) => (
            <div key={asset.symbol} className={styles.assetItem}>
              <div className={styles.assetIcon}>
                <img src={asset.iconUrl} alt={asset.symbol} />
              </div>
              <div className={styles.assetInfo}>
                <span className={styles.assetSymbol}>{asset.symbol}</span>
                <span className={styles.assetExchange}>({asset.exchange})</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssetList;
