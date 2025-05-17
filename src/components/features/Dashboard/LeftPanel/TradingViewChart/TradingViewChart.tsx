import { useEffect, useRef, memo, useContext } from "react";
import { AssetContext } from "../../../../../context/AssetContext";
import styles from "./TradingViewChart.module.css";

const TradingViewChart = () => {
  const container = useRef<HTMLDivElement>(null);
  const { selectedAsset } = useContext(AssetContext);

  useEffect(() => {
    if (!selectedAsset) return;
    // Clear any previous chart iframe or script
    if (container.current) {
      container.current.innerHTML = "";
    }

    const script = document.createElement("script");
    script.id = "tradingview-widget-script";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
    {
  "autosize": true,
  "symbol": "${selectedAsset}",
  "interval": "D",
  "timezone": "Etc/UTC",
  "theme": "dark",
  "style": "3",
  "locale": "en",
  "allow_symbol_change": false,
  "hide_side_toolbar": false,
  "save_image": false,
  "hide_volume": true,
  "support_host": "https://www.tradingview.com"
}`;

    container.current?.appendChild(script);

    return () => {
      // Clear chart container on unmount or before next injection
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [selectedAsset]);

  return (
    <div className={styles.tradingViewContainer} ref={container}>
      <div className={styles.tradingViewWidget}></div>
    </div>
  );
};

export default memo(TradingViewChart);
