import { useEffect, useRef, memo, useContext } from "react";
import { AssetContext } from "../../../../../context/AssetContext";
import styles from "./TradingViewChart.module.css";

const TradingViewChart = () => {
  const container = useRef<HTMLDivElement>(null);
  const { selectedAsset } = useContext(AssetContext);

  useEffect(() => {
    if (!selectedAsset) return;
    // Prevent duplicate script injection
    if (document.getElementById("tradingview-widget-script")) {
      return;
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
      // Cleanup script on unmount
      const existing = document.getElementById("tradingview-widget-script");
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
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
