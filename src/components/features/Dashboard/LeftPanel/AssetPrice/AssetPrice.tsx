import { useContext, useMemo } from "react";
import ChartArrow from "../../../../../assets/SVG/ChartArrow.svg";
import Currency from "../../../../../assets/SVG/Currency.svg";
import DefaultCryptoIcon from "../../../../../assets/SVG/DefaultCrypto.svg";
import styles from "./AssetPrice.module.css";
import { AssetContext } from "../../../../../context/AssetContext";
import { useLiveData } from "../../../../../hooks/useLiveData";

const AssetPrice = () => {
  const { assetData } = useContext(AssetContext);
  const { liveData, isConnected } = useLiveData();

  // Find live data for the selected asset
  const livePriceData = useMemo(() => {
    if (!assetData || !liveData || liveData.length === 0) return null;

    // Look for the ticker matching our asset symbol (usually with USDT suffix for main pairs)
    return liveData.find(
      (ticker) =>
        ticker.s === `${assetData.symbol}USDT` || ticker.s === assetData.symbol
    );
  }, [assetData, liveData]);

  if (!assetData) return null;

  // Use live price data if available, otherwise fall back to static data
  const price = livePriceData ? parseFloat(livePriceData.c) : assetData.price;

  // Use live price change if available, otherwise use static data
  const priceChangePercent = livePriceData
    ? parseFloat(livePriceData.P)
    : assetData.priceChangePercent;

  // Format price for display
  const totalPrice =
    price >= 1000
      ? `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : `$${price.toFixed(2)}`;

  // Format price change percentage
  const pricePercent = `${
    priceChangePercent >= 0 ? "+" : ""
  }${priceChangePercent.toFixed(2)}%`;

  // Determine if price change is positive or negative for styling
  const isPricePositive = priceChangePercent >= 0;

  return (
    <div className={styles.assetPriceContainer}>
      <div className={styles.assetPriceHeader}>
        <div className={styles.assetNameTag}>
          <img
            src={assetData.iconUrl || DefaultCryptoIcon}
            alt={assetData.symbol}
            onError={(e) => {
              (e.target as HTMLImageElement).src = DefaultCryptoIcon;
            }}
          />
          <h5>{assetData.symbol}</h5>
        </div>
        <div
          className={`${styles.assetChangePercent} ${
            isPricePositive ? styles.positive : styles.negative
          }`}
        >
          <img
            src={ChartArrow}
            alt="ChartArrow"
            className={isPricePositive ? styles.arrowUp : styles.arrowDown}
          />
          <p>{pricePercent}</p>
          {isConnected && <span className={styles.liveIndicator}></span>}
        </div>
      </div>
      <div className={styles.priceContainer}>
        <p>
          <span className={styles.assetTotalPrice}>{totalPrice}</span>
        </p>
        <img src={Currency} alt="USD" />
      </div>
    </div>
  );
};

export default AssetPrice;
