import { FC } from "react";
import DefaultCryptoIcon from "../../../../../assets/SVG/DefaultCrypto.svg";
import styles from "./SearchAssets.module.css";
import { Asset } from "./types";
import { FadeInMotion } from "../../../../../components/common";

interface AssetItemProps {
  asset: Asset;
  onSelectAsset: (asset: Asset) => void;
}

/**
 * Renders a single cryptocurrency asset item with icon, name, and price information
 */
const AssetItem: FC<AssetItemProps> = ({ asset, onSelectAsset }) => {
  // Format prices appropriately
  const formattedPrice =
    asset.price >= 1000
      ? `$${asset.price.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}`
      : `$${asset.price.toFixed(2)}`;

  // Format percentages with consistent style
  const formattedPercent = `${
    asset.priceChangePercent >= 0 ? "+" : ""
  }${asset.priceChangePercent.toFixed(2)}%`;

  // Format name to show only if different from symbol
  const displayName = asset.name !== asset.symbol ? asset.name : null;

  return (
    <FadeInMotion
      key={asset.symbol}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className={styles.assetItem} onClick={() => onSelectAsset(asset)}>
        <div className={styles.assetIcon}>
          <img
            src={asset.iconUrl || DefaultCryptoIcon}
            alt={asset.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = DefaultCryptoIcon;
            }}
          />
        </div>
        <div className={styles.assetInfo}>
          <span className={styles.assetSymbol}>{asset.symbol}</span>
          {displayName && (
            <span className={styles.assetName}>{displayName}</span>
          )}
          <span className={styles.assetExchange}>({asset.exchange})</span>
        </div>
        <div className={styles.cryptoPrice}>
          <span className={styles.price}>{formattedPrice}</span>
          <span
            className={`${styles.priceChange} ${
              asset.priceChangePercent >= 0 ? styles.positive : styles.negative
            }`}
          >
            {formattedPercent}
          </span>
        </div>
      </div>
    </FadeInMotion>
  );
};

export default AssetItem;
