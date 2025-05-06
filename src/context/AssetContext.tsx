import { ReactNode, useState, useContext, createContext } from "react";

export type TimeRange = "24h" | "1w" | "1m" | "6m" | "1y" | "all";

export type AssetData = {
  symbol: string;
  name: string;
  iconUrl: string;
  price: number;
  priceChangePercent: number;
  exchange?: string;
};

type AssetContextType = {
  selectedAsset: string;
  setSelectedAsset: (value: string) => void;
  assetData: AssetData | null;
  setAssetData: (data: AssetData | null) => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
};

type AssetProviderProps = {
  children: ReactNode;
};

const defaultContext: AssetContextType = {
  selectedAsset: "",
  setSelectedAsset: () => {},
  assetData: null,
  setAssetData: () => {},
  timeRange: "24h",
  setTimeRange: () => {},
};

export const AssetContext = createContext<AssetContextType>(defaultContext);

export const AssetProvider = ({ children }: AssetProviderProps) => {
  const [selectedAsset, setSelectedAsset] = useState("");
  const [assetData, setAssetData] = useState<AssetData | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>("24h");

  return (
    <AssetContext.Provider
      value={{
        selectedAsset,
        setSelectedAsset,
        assetData,
        setAssetData,
        timeRange,
        setTimeRange,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAsset = () => {
  const context = useContext(AssetContext);
  return context;
};
