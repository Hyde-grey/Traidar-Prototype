import { useEffect, useRef, memo, useContext } from "react";
import { AssetContext } from "../../../../../context/AssetContext";

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
  "style": "1",
  "locale": "en",
  "withdateranges": true,
  "hide_side_toolbar": false,
  "allow_symbol_change": true,
  "details": true,
  "hotlist": true,
  "show_popup_button": true,
  "popup_width": "1000",
  "popup_height": "650",
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
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
    </div>
  );
};

export default memo(TradingViewChart);
