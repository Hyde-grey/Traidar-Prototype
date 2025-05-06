import { useState, useRef, useEffect, useContext } from "react";
import { useFetchCryptoData } from "./useFetchData";
import styles from "./SearchAssets.module.css";
import { AssetContext } from "../../../../../context/AssetContext";
import SearchBar from "./SearchBar";
import AssetList from "./AssetList";
import { Asset } from "./types";

// List of trending assets to show at the top (in this order)
const trendingSymbols = ["BTC", "ETH", "SOL"];

// List of assets to show at the top of "All Assets" section
const allAssetsOrder = ["ADA", "BNB", "XRP", "DOT", "DOGE", "LINK"];

/**
 * SearchAssets component with search functionality and asset lists
 */
const SearchAssets = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: cryptoData, loading, error } = useFetchCryptoData();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedAsset, setSelectedAsset, setAssetData } =
    useContext(AssetContext);

  const [trendingAssets, setTrendingAssets] = useState<Asset[]>([]);
  const [allAssets, setAllAssets] = useState<Asset[]>([]);

  // Prepare data for display
  useEffect(() => {
    if (cryptoData.length > 0) {
      // Convert Binance data to our format with price info
      const formattedCryptoData = cryptoData
        .filter((crypto) => crypto.baseAsset && crypto.iconUrl)
        .map((crypto) => ({
          symbol: crypto.baseAsset as string,
          name: crypto.name || (crypto.baseAsset as string),
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

  // Update search term when selectedAsset changes
  useEffect(() => {
    if (selectedAsset) {
      setSearchTerm(selectedAsset);
    }
  }, [selectedAsset]);

  // Filter assets based on search term
  const filteredAssets =
    searchTerm.trim() === ""
      ? [] // Don't filter if search is empty - we'll show categories instead
      : [...trendingAssets, ...allAssets].filter((crypto) => {
          const searchTermLower = searchTerm.toLowerCase();
          return (
            crypto.symbol.toLowerCase().includes(searchTermLower) ||
            crypto.name.toLowerCase().includes(searchTermLower)
          );
        });

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

  // Add a clear handler function
  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedAsset("");
    setAssetData(null);
    setIsSearching(false);
  };

  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset.symbol);
    setSearchTerm(asset.symbol);
    setIsSearching(false);
    setAssetData(asset);
  };

  return (
    <div className={styles.searchContainer}>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleClearSearch={handleClearSearch}
        setIsSearching={setIsSearching}
        inputRef={inputRef}
      />

      {isSearching && (
        <div ref={dropdownRef} className={styles.searchDropdown}>
          <AssetList
            trendingAssets={trendingAssets}
            allAssets={allAssets}
            filteredAssets={filteredAssets}
            searchTerm={searchTerm}
            loading={loading}
            error={error}
            onSelectAsset={handleSelectAsset}
          />
        </div>
      )}
    </div>
  );
};

export default SearchAssets;
