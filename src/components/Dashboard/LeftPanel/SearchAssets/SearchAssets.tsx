import { useState, useRef, useEffect } from "react";
import SearchIcon from "../../../../assets/SVG/Search.svg";
import ChartArrow from "../../../../assets/SVG/ChartArrow.svg";
import DefaultCryptoIcon from "../../../../assets/SVG/DefaultCrypto.svg";
import { useFetchCryptoData } from "./useFetchData";
import styles from "./SearchAssets.module.css";

// List of trending assets to show at the top (in this order)
const trendingSymbols = ["BTC", "ETH", "SOL"];

// List of assets to show at the top of "All Assets" section
const allAssetsOrder = ["ADA", "BNB", "XRP", "DOT", "DOGE", "LINK"];

const SearchAssets = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: cryptoData, loading, error } = useFetchCryptoData();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [trendingAssets, setTrendingAssets] = useState<any[]>([]);
  const [allAssets, setAllAssets] = useState<any[]>([]);

  // Prepare data for display
  useEffect(() => {
    if (cryptoData.length > 0) {
      // Convert Binance data to our format with price info
      const formattedCryptoData = cryptoData
        .filter((crypto) => crypto.baseAsset && crypto.iconUrl)
        .map((crypto) => ({
          symbol: crypto.baseAsset as string,
          exchange: "Binance",
          iconUrl: crypto.iconUrl as string,
          price: parseFloat(crypto.lastPrice),
          priceChangePercent: parseFloat(crypto.priceChangePercent),
        }));

      // Filter out trending assets
      const trending = formattedCryptoData.filter((asset) =>
        trendingSymbols.includes(asset.symbol)
      );

      // Sort trending by the order in trendingSymbols
      trending.sort(
        (a, b) =>
          trendingSymbols.indexOf(a.symbol) - trendingSymbols.indexOf(b.symbol)
      );

      // Prioritize specific assets for the "All Assets" section
      const prioritizedAssets = formattedCryptoData.filter(
        (asset) =>
          allAssetsOrder.includes(asset.symbol) &&
          !trendingSymbols.includes(asset.symbol)
      );

      prioritizedAssets.sort(
        (a, b) =>
          allAssetsOrder.indexOf(a.symbol) - allAssetsOrder.indexOf(b.symbol)
      );

      // Get remaining assets
      const remainingAssets = formattedCryptoData.filter(
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

  // Filter assets based on search term
  const filteredAssets =
    searchTerm.trim() === ""
      ? [] // Don't filter if search is empty - we'll show categories instead
      : [...trendingAssets, ...allAssets].filter((crypto) =>
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Render an asset item with price data
  const renderAssetItem = (asset: any) => {
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

    return (
      <div
        key={asset.symbol}
        className={styles.assetItem}
        onClick={() => {
          setSearchTerm(asset.symbol);
          setIsSearching(false);
        }}
      >
        <div className={styles.assetIcon}>
          <img
            src={asset.iconUrl || DefaultCryptoIcon}
            alt={asset.symbol}
            onError={(e) => {
              (e.target as HTMLImageElement).src = DefaultCryptoIcon;
            }}
          />
        </div>
        <div className={styles.assetInfo}>
          <span className={styles.assetSymbol}>{asset.symbol}</span>
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
    );
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <img src={SearchIcon} alt="Search" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search Assets"
          onFocus={() => setIsSearching(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      {isSearching && (
        <div ref={dropdownRef} className={styles.searchDropdown}>
          {loading ? (
            <div className={styles.loadingMessage}>Loading assets...</div>
          ) : error ? (
            <div className={styles.errorMessage}>Error loading data</div>
          ) : searchTerm.trim() !== "" ? (
            // Show filtered results when searching
            filteredAssets.length === 0 ? (
              <div className={styles.noResultsMessage}>
                No assets found matching "{searchTerm}"
              </div>
            ) : (
              filteredAssets.map((asset) => renderAssetItem(asset))
            )
          ) : (
            // Show categorized assets when not searching
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
                  trendingAssets.map((asset) => renderAssetItem(asset))
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
                  allAssets.map((asset) => renderAssetItem(asset))
                ) : (
                  <div className={styles.loadingMessage}>No assets found</div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAssets;
