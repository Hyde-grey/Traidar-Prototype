import { FC } from "react";
import ChartArrow from "../../../assets/SVG/ChartArrow.svg";
import styles from "./SearchAssets.module.css";
import AssetItem from "./AssetItem";
import { Asset } from "./types";
import { FadeInMotion } from "../../common";
import { AnimatePresence } from "framer-motion";

interface AssetListProps {
  trendingAssets: Asset[];
  allAssets: Asset[];
  filteredAssets: Asset[];
  searchTerm: string;
  loading: boolean;
  error: Error | null;
  onSelectAsset: (asset: Asset) => void;
}

/**
 * Displays lists of cryptocurrency assets with sections for trending and all assets
 */
const AssetList: FC<AssetListProps> = ({
  trendingAssets,
  allAssets,
  filteredAssets,
  searchTerm,
  loading,
  error,
  onSelectAsset,
}) => {
  if (loading) {
    return (
      <FadeInMotion
        key="loading"
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className={styles.loadingMessage}>Loading assets...</div>
      </FadeInMotion>
    );
  }

  if (error) {
    return (
      <FadeInMotion key="error" transition={{ duration: 0.2, ease: "easeOut" }}>
        <div className={styles.errorMessage}>Error loading data</div>
      </FadeInMotion>
    );
  }

  // Show filtered results when searching
  if (searchTerm.trim() !== "") {
    if (filteredAssets.length === 0) {
      return (
        <FadeInMotion
          key="no-results"
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className={styles.noResultsMessage}>
            No assets found matching "{searchTerm}"
          </div>
        </FadeInMotion>
      );
    }

    return (
      <FadeInMotion
        key="search-results"
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className={styles.assetList}>
          {filteredAssets.map((asset) => (
            <AssetItem
              key={asset.symbol}
              asset={asset}
              onSelectAsset={onSelectAsset}
            />
          ))}
        </div>
      </FadeInMotion>
    );
  }

  // Show categorized assets when not searching
  return (
    <AnimatePresence mode="wait">
      <FadeInMotion
        key="asset-categories"
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <>
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
            {trendingAssets.length > 0 ? (
              trendingAssets.map((asset) => (
                <AssetItem
                  key={asset.symbol}
                  asset={asset}
                  onSelectAsset={onSelectAsset}
                />
              ))
            ) : (
              <div className={styles.loadingMessage}>
                No trending assets found
              </div>
            )}
          </div>

          {/* All Assets Section */}
          <div className={styles.sectionHeader}>
            <h2>All Assets</h2>
            <div className={styles.divider}></div>
          </div>

          <div className={`${styles.assetList} ${styles.scrollable}`}>
            {allAssets.length > 0 ? (
              allAssets.map((asset) => (
                <AssetItem
                  key={asset.symbol}
                  asset={asset}
                  onSelectAsset={onSelectAsset}
                />
              ))
            ) : (
              <div className={styles.loadingMessage}>No assets found</div>
            )}
          </div>
        </>
      </FadeInMotion>
    </AnimatePresence>
  );
};

export default AssetList;
