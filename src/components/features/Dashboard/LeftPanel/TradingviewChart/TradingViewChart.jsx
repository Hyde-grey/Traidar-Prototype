// TradingViewWidget.jsx
import React, { useEffect, useRef, memo, useContext, useState } from "react";
import { AssetContext } from "../../../../../context/AssetContext";

function TradingViewWidget() {
  const container = useRef();
  const { selectedAsset } = useContext(AssetContext);

  // Original TradingView widget setup
  useEffect(() => {
    const existingScript = document.getElementById("tradingview-widget-script");
    if (existingScript) {
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
          "style": "2",
          "locale": "en",
          "toolbar_bg": "transparent",
          "enable_publishing": false,
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": false,
          "details": false,
          "hotlist": false,
          "calendar": false,
          "studies": [
            "RSI@tv-basicstudies",
            "MASimple@tv-basicstudies"
          ],
          "show_popup_button": false,
          "popup_width": "1000",
          "popup_height": "650",
          "container_id": "tradingview_chart",
          "hide_volume": false,
          "backgroundColor": "transparent",
          "gridColor": "rgba(42, 46, 57, 0.8)",
          "hide_top_toolbar": false,
          "support_host": "https://www.tradingview.com",
          "width": "100%",
          "height": "100%",
          "enabled_features": [
            "study_templates",
            "use_localstorage_for_settings"
          ],
          "disabled_features": [
            "header_symbol_search",
            "header_compare"
          ]
        }`;

    const currentContainer = container.current;
    currentContainer.appendChild(script);

    return () => {
      if (currentContainer.contains(script)) {
        currentContainer.removeChild(script);
      }
      if (existingScript) {
        existingScript.remove();
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
        id="tradingview_chart"
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
